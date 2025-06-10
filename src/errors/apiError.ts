export class ApiError extends Error {
  constructor(
    public code: string,
    public fields: Record<string, string> = {},
) { 
    super(code);
    Error.captureStackTrace(this, this.constructor);
  }
}
