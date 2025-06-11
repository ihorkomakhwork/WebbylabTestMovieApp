export class ApiError extends Error {
    constructor(
        public code: string,
        public fields: Record<string, string | number> = {},
    ) {
        super(code);
        Error.captureStackTrace(this, this.constructor);
    }
}
