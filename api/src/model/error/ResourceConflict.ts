import { ErrorType } from './ErrorType';

export class ResourceConflict extends Error {

    message: string = 'System Error';
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.type = ErrorType.RESOURCE_CONFLICT;
    }

}