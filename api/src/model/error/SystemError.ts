import { ErrorType } from './ErrorType';

export class SystemError extends Error {

    description: string;
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.description = message;
        this.type = ErrorType.SYSTEM_ERROR;
    }

}