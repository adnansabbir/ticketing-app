import {CustomError} from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor() {
        super('Error connecting to db');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Error connecting to database'}];
    }
}
