import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getEnvironment } from '../util/environment';
import { Environment } from "../model/data/Environment";

const createDynamoDBClient = () => {
    switch (getEnvironment()) {
        case Environment.LOCAL:
            return new DynamoDBClient({
                region: process.env.REGION,
                endpoint: "http://localhost:4566",
                credentials: {
                    accessKeyId: "dummy-access-key",
                    secretAccessKey: "dummy-secret-key",
                },
            });
        case Environment.AWS_SAM:
            return new DynamoDBClient({
                region: process.env.REGION,
                endpoint: "http://host.docker.internal:4566",
                credentials: {
                    accessKeyId: "dummy-access-key",
                    secretAccessKey: "dummy-secret-key",
                },
            });
        case Environment.AWS:
            return new DynamoDBClient({
                region: process.env.REGION
            });
        default:
            throw new Error('Invalid environment value [ ' + process.env.ENVIRONMENT + ' ].');
    }
}

export const docClient = DynamoDBDocumentClient.from(createDynamoDBClient());