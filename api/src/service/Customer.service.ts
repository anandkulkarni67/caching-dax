import { UpdateCustomerMetadata } from '../model/data/UpdateCustomerMetadata';
import { dynamoDBClient } from '../util/awsUtil';
import { daysinFuture } from '../util/dataTime';
import { PutCommandInput, UpdateCommandInput, DeleteCommandInput, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from 'crypto';
import { NotFound } from '../model/error/NotFound';
import { ResourceConflict } from '../model/error/ResourceConflict';
import { GetCustomerMetadata } from '../model/data/GetCustomerMetadata';
import { CreateCustomerMetadata } from '../model/data/CreateCustomerMetadata';

class CustomerService {

    public async addCustomer(metadata: CreateCustomerMetadata): Promise<GetCustomerMetadata> {
        try {
            const customerId = randomUUID();
            const command: PutCommandInput = {
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Item: {
                    CustomerId: customerId,
                    Metadata: {
                        ...metadata,
                        customerId
                    },
                    Version: 1,
                    Ttl: daysinFuture(Number(process.env.TTL_DAYS))
                }
            };
            const data = await dynamoDBClient.put(command);
            return {
                ...metadata,
                customerId,
                version: 1
            }
        } catch (error: any) {
            throw error;
        }
    }

    public async updateCustomer(customerId: string, metadata: UpdateCustomerMetadata): Promise<GetCustomerMetadata> {
        try {
            const command: UpdateCommandInput = {
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Key: {
                    CustomerId: customerId,
                },
                UpdateExpression: "set Version = :newversion, metadata = :metadata", // optimitstic locking using version checks.
                ConditionExpression: "Version = :currentVersion",
                ExpressionAttributeValues: {
                    ":metadata": {
                        ...metadata,
                        customerId,
                        version: metadata.version + 1
                    },
                    ":newversion": metadata.version + 1,
                    ":currentVersion": metadata.version
                },
                ReturnValuesOnConditionCheckFailure: "ALL_OLD"
            };
            const data = await dynamoDBClient.update(command);
            return {
                ...metadata,
                customerId,
                version: metadata.version + 1
            }
        } catch (error: any) {
            if (error.message && error.message == 'The conditional request failed') {
                if (error.Item) {
                    if ( error.Item.Version.N != metadata.version) {
                        throw new ResourceConflict('State conflict for the Customer record [ customerId: ' + customerId + ' ]')
                    }
                } else {
                    throw new NotFound('Customer with [ customerId: ' + customerId + ' ] not found.');
                }
            }
            throw error;
        }
    }

    public async deleteCustomer(customerId: String, version: number): Promise<void> {
        try {
            const command: DeleteCommandInput = {
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Key: {
                    CustomerId: customerId
                },
                ConditionExpression: "Version = :currentVersion", // optimitstic locking using version checks.
                ExpressionAttributeValues: {
                    ":currentVersion": version
                },
                ReturnValuesOnConditionCheckFailure: "ALL_OLD"
            };
            await dynamoDBClient.delete(command);
        } catch (error: any) {
            if (error.message && error.message == 'The conditional request failed') {
                if (error.Item) {
                    if ( error.Item.Version.N != version) {
                        throw new ResourceConflict('State conflict for the Customer record [ customerId: ' + customerId + ' ]')
                    }
                } else {
                    throw new NotFound('Customer with [ customerId: ' + customerId + ' ] not found.');
                }
            }
            throw error;
        }
    }

    public async getCustomer(customerId: String): Promise<GetCustomerMetadata> {
        try {
            const command: GetCommandInput = {
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Key: {
                    CustomerId: customerId
                }
            };
            const data = await dynamoDBClient.get(command);
            if (data.Item) {
                return {
                    ...data.Item.Metadata,
                    version: data.Item.Version
                };
            }
            throw new NotFound('Customer [id: ' + customerId + '] not found.');
        } catch (error: any) {
            throw error;   
        }
    }

}

export const customerService = new CustomerService();