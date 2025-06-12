import { Request, Response, NextFunction } from 'express';
import { ValidateFunction } from 'ajv';
import { validate } from '../utils/ajv';

export const validateBodyMiddleware = (validateSchema: ValidateFunction) => 
    (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => { 
    validate(req.body, validateSchema);
    next();
  };
export const validateQueryMiddleware = (validateSchema: ValidateFunction) => 
  (
  req: Request,
  res: Response,
  next: NextFunction,
): void => { 
  validate(req.query, validateSchema);
  next();
};