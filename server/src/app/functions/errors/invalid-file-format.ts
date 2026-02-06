export class NotFoundLinkError extends Error {
    public readonly field: string;
    public readonly value: string;
    public readonly statusCode: number;

    constructor(field: string, value: string) {
        super(`Invalid file format for field "${field}": received "${value}"`);
        this.name = "NotFoundLinkError";
        this.field = field;
        this.value = value;
        this.statusCode = 404;

        Object.setPrototypeOf(this, NotFoundLinkError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}