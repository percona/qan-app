import { ErrorHandler } from '@angular/core';

export class QanError {

    public name = 'QanError';
    public message = '';

    constructor(message: string) {
        this.message = message;
    }
}

export class QanErrorHandler extends ErrorHandler {

    handleError(error: any): void {
        try {
            super.handleError(error);
        } catch (err) {
            console.log('hhhh', err);
        }
    }
}
