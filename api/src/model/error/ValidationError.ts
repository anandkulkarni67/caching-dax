import { ErrorType } from './ErrorType';

export class ValidationError extends Error {

    message: string = 'System Error';
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.type = ErrorType.NOT_FOUND;
    }

}