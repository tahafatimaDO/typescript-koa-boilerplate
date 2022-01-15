export default class AppError extends Error {
    code: number;
    error: Error | undefined;
    constructor(code: number, message: string, error?: Error);
    toModel(): {
        code: number;
        message: string;
    };
}
