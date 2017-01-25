import { ErrorHandler } from '@angular/core';

export class QanError {

    public name: string = 'QanError';
    public message: string = '';

    constructor(message: string) {
        this.message = message;
    }
}

export class QanErrorHandler extends ErrorHandler {

    handleError(error: any): void {
        // console.dir(error);
        // console.log(`QanErrorHandler: `, error.rejection.originalError.message);

        try {
            super.handleError(error);
        } catch (err) {
            console.log('hhhh', err);
        }
    }
}