export class InvalidFileFormatError extends Error {
    constructor() {
        super("Invalid file format. Only JPEG and PNG are allowed.");
    }
}