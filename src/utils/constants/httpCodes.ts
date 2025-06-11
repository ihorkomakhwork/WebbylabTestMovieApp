export const HTTP_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    OK: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export type THttpCodes = (typeof HTTP_CODES)[keyof typeof HTTP_CODES];
