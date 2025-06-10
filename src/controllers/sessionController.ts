import { Request, Response } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/crypto';
import { ApiError } from '../errors/apiError';
import { ERROR_CODES } from '../utils/constants/errorCodes';
import { API_STATUSES } from '../utils/constants/apiStatuses';


export const sessionController = {
    create: async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}, raw: true})
        const authError = new ApiError(
            ERROR_CODES.AUTHENTICATION_FAILED, {
            email: ERROR_CODES.AUTHENTICATION_FAILED,
            password: ERROR_CODES.AUTHENTICATION_FAILED
        });
        if (!user) throw authError; 
        console.log(user)
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) throw authError;
        const token = generateToken(user.id, user.email)
        res.json({token, status: API_STATUSES.OK}) 
    } 
} 