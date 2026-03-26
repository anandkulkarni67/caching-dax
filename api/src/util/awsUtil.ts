import { getEnvironment } from '../util/environment';
import { Environment } from "../model/data/Environment";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DaxDocument } from "@amazon-dax-sdk/lib-dax";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const createDynamoDBClient = () => {
    switch (getEnvironment()) {
        case Environment.LOCAL:
            return DynamoDBDocument.from(new DynamoDB({
                region: process.env.REGION,
                endpoint: "http://localhost:4566",
                credentials: {
                    accessKeyId: "dummy-access-key",
                    secretAccessKey: "dummy-secret-key",
                },
             }));
        case Environment.AWS_SAM:
            return DynamoDBDocument.from(new DynamoDB({
                region: process.env.REGION,
                endpoint: "http://host.docker.internal:4566",
                credentials: {
                    accessKeyId: "dummy-access-key",
                    secretAccessKey: "dummy-secret-key",
                },
             }));
        case Environment.AWS:
            return new DaxDocument({ 
                region: process.env.REGION,
                endpoint: process.env.CUSTOMER_TABLE_CACHE_ENDPOINT
            });
        default:
            throw new Error('Invalid environment value [ ' + process.env.ENVIRONMENT + ' ].');
    }
}

export const dynamoDBClient = createDynamoDBClient();