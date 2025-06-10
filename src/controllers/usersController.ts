import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import { generateToken } from '../utils/crypto';
import { ApiError } from '../errors/apiError';
import { ERROR_CODES } from '../utils/constants/errorCodes';
import { API_STATUSES } from '../utils/constants/apiStatuses';

export const usersController = {
    create: async (req: Request, res: Response): Promise<void> => { 
        const { email, name, confirmPassword, password } = req.body;
        const candidate = await User.findOne({where: {email}});
        if (candidate) throw new ApiError(
            `EMAIL_${ERROR_CODES.NOT_UNIQUE}`, 
            { email: ERROR_CODES.NOT_UNIQUE }
        );
        if (password !== confirmPassword) throw new ApiError(
            `PASSWORD_${ERROR_CODES.NOT_EQUAL}`,
            { 
                confirmPassword: ERROR_CODES.NOT_EQUAL, 
                password: ERROR_CODES.NOT_EQUAL
            }
        );
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email, 
            name, 
            confirmPassword, 
            password: hashPassword
        });
        const token = generateToken(user.id, user.email);
        res.json({ token, status: API_STATUSES.OK });
    } 

} 