import { Environment } from '../model/data/Environment';

export const getEnvironment = () => {
    if (process.env.AWS_SAM_LOCAL == 'true') {
        return Environment.AWS_SAM;
    }
    else if (process.env.ENVIRONMENT == 'aws') {
        return Environment.AWS;
    } else {
        return Environment.LOCAL;
    }
}