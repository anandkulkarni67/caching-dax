import { ErrorType } from './ErrorType';

export class SystemError extends Error {

    message: string = 'System Error';
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.type = ErrorType.SYSTEM_ERROR;
    }

}