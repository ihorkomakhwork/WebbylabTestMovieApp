import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { Actor } from './actorModel';
import { ActorMovie } from './actorMovieModel';

@Table({ tableName: 'Movie' })
export class Movie extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    year: number;

    @Column({
        type: DataType.ENUM('VHS', 'DVD', 'Blu-Ray'),
        allowNull: false,
    })
    format: 'VHS' | 'DVD' | 'Blu-Ray';

    @BelongsToMany(() => Actor, () => ActorMovie)
    actors: Actor[];
}
