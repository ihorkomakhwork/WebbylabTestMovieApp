import { ajv } from '../utils/ajv';
import { FromSchema } from 'json-schema-to-ts';
import { REG_EXPS } from '../utils/constants/regularExpressions';

const moiveSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
            pattern: REG_EXPS.MOVIE_TITLE,
        },
        year: {
            type: 'integer',
            minimum: 1850,
            maxCurrentYear: true
        },
        format: {
            type: 'string',
            enum: ['VHS', 'DVD', 'Blu-Ray']
        },
        actors: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 1,
                maxLength: 255,
                pattern: REG_EXPS.PERSON_NAME

            },
    
            uniqueItems: true
        }
    },
    required: ['title', 'year', 'format', 'actors'],
    additionalProperties: false
} as const;

const moviesSchema = {
    type: 'array',
    items: moiveSchema,
} as const;

const movieQuerySchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
            pattern: REG_EXPS.MOVIE_TITLE,
        },
        search: {
            type:'string',
            minLength: 1,
            maxLength: 255,
            anyOf: [
                {
                    pattern: REG_EXPS.MOVIE_TITLE
                },
                {
                    pattern: REG_EXPS.PERSON_NAME
                }
            ]
        },
        actor: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
            pattern: REG_EXPS.PERSON_NAME

        },
        order: {
            type: 'string',
            enum: ['ASC', 'DESC']
        },
        sort: {
            type: 'string',
            enum: ['id', 'title', 'year']
        },
        limit: {
            type: 'string',
            pattern: REG_EXPS.POSITIVE_INTEGERS_FROM_ONE
        },
        offset: {
            type: 'string',
            pattern: REG_EXPS.POSITIVE_INTEGERS
        },
    },
    additionalProperties: false
} as const;

export type CreateMovieDto = FromSchema<typeof moiveSchema>;

export const createMovieDto = ajv.compile(moiveSchema);

export type CreateMoviesDto = FromSchema<typeof moviesSchema>;

export const createMoviesDto = ajv.compile(moviesSchema);

export const patchMovieDto = createMovieDto;

export type MovieQueryDto = FromSchema<typeof movieQuerySchema>;

export const movieQueryDto = ajv.compile(movieQuerySchema);