import { ErrorType } from './ErrorType';

export class ValidationError extends Error {

    description: string;
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.description = message;
        this.type = ErrorType.NOT_FOUND;
    }

}