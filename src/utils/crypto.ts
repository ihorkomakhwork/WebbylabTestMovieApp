import jwt from 'jsonwebtoken';

export const generateToken = (id: number, email: string) =>
    jwt.sign({ id, email }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: Number(process.env.JWT_EXPIRES_IN),
    });
