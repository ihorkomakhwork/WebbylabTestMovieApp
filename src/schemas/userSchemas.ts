import { ajv } from '../utils/ajv';
import { FromSchema } from 'json-schema-to-ts';
import { REG_EXPS } from '../utils/constants/regularExpressions';

const schema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        pattern: REG_EXPS.NO_EMPTY,
        minLength: 8,
        maxLength: 255
      },
      confirmPassword: {
        type: 'string',
        pattern: REG_EXPS.NO_EMPTY,
        minLength: 8,
        maxLength: 255
      },
      name: {
        type: 'string',
        pattern: REG_EXPS.PERSON_NAME,
        minLength: 5,
        maxLength: 255,
    },
      
    },
    required: ['email', 'password', 'confirmPassword', 'name'],
    additionalProperties: false
} as const;

export type UserCreateDto = FromSchema<typeof schema>;

export const userCreateDto = ajv.compile(schema);