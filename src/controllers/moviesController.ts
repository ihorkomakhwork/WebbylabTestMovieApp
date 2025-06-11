import { Request, Response } from 'express';
import { Movie } from '../models/movieModel';
import { Includeable, Op, ReplicationOptions, WhereOptions } from 'sequelize';
import { db } from '../utils/db';
import { Actor } from '../models/actorModel';
import { ApiError } from '../errors/apiError';
import { ERROR_CODES } from '../utils/constants/errorCodes';
import { API_STATUSES } from '../utils/constants/apiStatuses';

const parseMovieFile = (moviesFile: Express.Multer.File) => {
    const content = moviesFile.buffer.toString('utf8');

    const blocks = content.trim().split(/\n\s*\n/);

    const movieRegex =
        /Title:\s*(.+)\s*Release Year:\s*(\d{4})\s*Format:\s*(.+)\s*Stars:\s*(.+)/i;

    const movies = blocks.map((block) => {
        const match = block.match(movieRegex);

        if (!match) throw new ApiError(`FILE_${ERROR_CODES.FORMAT_ERROR}`);

        const [, title, yearStr, format, stars] = match;

        return {
            title: title.trim(),
            year: parseInt(yearStr.trim(), 10),
            format: format.trim(),
            actors: stars.split(',').map((actor: string) => actor.trim()),
        };
    });
    return movies;
};

export const moviesController = {
    create: async (req: Request, res: Response) => {
        const { title, year, format, actors } = req.body;

        const existingMovie = await Movie.findOne({ where: { title, year } });
        if (existingMovie)
            throw new ApiError(`MOVIE_${ERROR_CODES.EXISTS}`, {
                title: ERROR_CODES.NOT_UNIQUE,
            });
        let data;
        await db.transaction(async (t) => {
            const movie = await Movie.create(
                { title, year, format },
                { transaction: t },
            );

            if (actors && actors.length > 0) {
                for await (const actorName of actors) {
                    let actor = await Actor.findOne({
                        where: {
                            name: actorName,
                        },
                        transaction: t,
                    });
                    if (!actor)
                        actor = await Actor.create(
                            { name: actorName },
                            { transaction: t },
                        );
                    await movie.$add('actor', actor, { transaction: t });
                }
            }
            data = await Movie.findByPk(movie.id, {
                include: {
                    model: Actor,
                    through: { attributes: [] },
                },
                transaction: t,
            });
        });
        res.json({ data, status: API_STATUSES.OK });
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie)
            throw new ApiError(`MOVIE_${ERROR_CODES.NOT_FOUND}`, {
                id: Number(id),
            });

        await movie.destroy();
        res.json({ status: API_STATUSES.OK });
    },

    patch: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, year, format, actors } = req.body;

        const movie = await Movie.findByPk(id);
        if (!movie)
            throw new ApiError(`MOVIE_${ERROR_CODES.NOT_FOUND}`, {
                id: Number(id),
            });

        let data;
        await db.transaction(async (t) => {
            movie.title = title;
            movie.year = year;
            movie.format = format;
            await movie.save({ transaction: t });

            const actorInstances: Actor[] = [];
            for await (const actorName of actors) {
                const [actor] = await Actor.findOrCreate({
                    where: { name: actorName },
                    defaults: { name: actorName },
                    transaction: t,
                });
                actorInstances.push(actor);
            }
            await movie.$set('actors', actorInstances, { transaction: t });

            data = await Movie.findByPk(movie.id, {
                include: {
                    model: Actor,
                    through: { attributes: [] },
                },
            });
        });
        res.json({ data, status: API_STATUSES.OK });
    },

    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const movie = await Movie.findByPk(id, {
            include: {
                model: Actor,
                through: { attributes: [] },
            },
        });
        if (!movie)
            throw new ApiError(`MOVIE_${ERROR_CODES.NOT_FOUND}`, {
                id: Number(id),
            });

        res.json({ data: movie, status: API_STATUSES.OK });
    },

    list: async (req: Request, res: Response) => {
        const {
            actor,
            title,
            search,
            sort = 'id',
            order = 'ASC',
            limit = '20',
            offset = '0',
        } = req.query;

        let where: WhereOptions = {};
        let replacmentsObj: object = {};
        const include: Includeable[] = [];

        if (search) {

            include.push({
              model: Actor,
              as: 'actors',
              through: { attributes: [] },
              attributes: [],
              required: false,
            });
          
            where = db.literal(`
              "Movie"."title" LIKE :search
              OR EXISTS (
                SELECT 1
                FROM "ActorMovie" AS am
                JOIN "Actor" AS a ON a.id = am.actorId
                WHERE am.movieId = "Movie".id AND a.name LIKE :search
              )
            `);
              replacmentsObj = { replacements:{ search: `%${search}%`} };
        } else {
            if (title) where = { title: { [Op.like]: `%${title}%` } };

            if (actor) {
                include.push({
                    model: Actor,
                    where: { name: { [Op.like]: `%${actor}%` } },
                    through: { attributes: [] },
                    attributes: [],
                });
            }
        }

        const movies = await Movie.findAndCountAll({
            where,
            ...replacmentsObj,
            include,
            order: [[sort as string, order as string]],
            limit: parseInt(limit as string, 10),
            offset: parseInt(offset as string, 10),
        });
        res.json({
            data: movies.rows,
            meta: { total: movies.count },
            status: API_STATUSES.OK,
        });
    },
    import: async (req: Request, res: Response) => {
        if (!req.file) throw new ApiError(ERROR_CODES.FORMAT_ERROR, {
            file: ERROR_CODES.REQUIRED,
        });

        const movies = parseMovieFile(req.file as Express.Multer.File);

        const createdMovies: Movie[] = [];
        let totalMoviesCount;
        try {
            await db.transaction(async (t) => {
                for (const movieData of movies) {
                    const [movie, created] = await Movie.findOrCreate({
                        where: { title: movieData.title, year: movieData.year },
                        defaults: { format: movieData.format },
                        transaction: t,
                    });

                    if (created) createdMovies.push(movie);

                    if (movieData.actors && movieData.actors.length > 0) {
                        for await (const actorName of movieData.actors) {
                            const [actor] = await Actor.findOrCreate({
                                where: { name: actorName },
                                defaults: { name: actorName },
                                transaction: t,
                            });
                            await movie.$add('actor', actor, {
                                transaction: t,
                            });
                        }
                    }
                }
                totalMoviesCount = await Movie.count({ transaction: t });
            });
        } catch (_error) {
            throw new ApiError(`FILE_${ERROR_CODES.FORMAT_ERROR}`);
        }

        res.json({
            status: API_STATUSES.OK,
            data: createdMovies.map((movie) => movie.toJSON()),
            meta: {
                imported: createdMovies.length,
                total: totalMoviesCount,
            },
        });
    },
};
