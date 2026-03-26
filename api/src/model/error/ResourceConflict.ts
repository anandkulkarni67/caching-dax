import { ErrorType } from './ErrorType';

export class ResourceConflict extends Error {

    description: string;
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.description = message;
        this.type = ErrorType.RESOURCE_CONFLICT;
    }

}