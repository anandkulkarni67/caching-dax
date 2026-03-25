import { ErrorType } from './ErrorType';

export class NotFound extends Error {

    message: string = 'System Error';
    type: ErrorType;

    constructor(message: string) {
        super(message);
        this.type = ErrorType.NOT_FOUND;
    }

}