import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { ERROR_CODES } from './constants/errorCodes';
import { ApiError } from '../errors/apiError';

export const ajv = new Ajv({ allErrors: true});
addFormats(ajv);
ajv.addKeyword({
    keyword: 'maxCurrentYear',
    type: 'number',
    validate: (_schema: boolean, data: number) => { 
        return data <= new Date().getFullYear()
    },
    errors: false
  })

export const validate = (
    input: unknown, 
    validateSchema: ValidateFunction
): void => {
    const valid = validateSchema(input);
    const fields: Record<string, string> = {};
    
    if (!valid && validateSchema.errors) {
      for (const error of validateSchema.errors) {
        const field: string = error.instancePath.slice(1);
        if (error.keyword === 'required') {
          fields[error.params.missingProperty] = `${ERROR_CODES.REQUIRED}`;
        } else if (error.keyword === 'additionalProperties') {
          fields[error.params.additionalProperty] = `${ERROR_CODES.UNNECESARY}`;
        }
        else { 
          fields[field] = `${ERROR_CODES.FORMAT_ERROR}`;    
        }
      }
      throw new ApiError(ERROR_CODES.FORMAT_ERROR, fields);
    }
}