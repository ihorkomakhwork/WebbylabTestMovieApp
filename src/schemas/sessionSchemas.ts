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
    },
    required: ['email', 'password'],
    additionalProperties: false
} as const;

export type CreatSessionDto = FromSchema<typeof schema>;

export const createSessionDto = ajv.compile(schema);