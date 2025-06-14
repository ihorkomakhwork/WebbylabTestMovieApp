import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    BeforeSave,
} from 'sequelize-typescript';
import { Actor } from './actorModel';
import { ActorMovie } from './actorMovieModel';

@Table({ 
  tableName: 'Movie',
  defaultScope: {
    attributes: { exclude: ['normalizedTitle'] }
  }, 

})
export class Movie extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({ type: DataType.STRING})
    normalizedTitle: string;

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

    @BeforeSave
    static saveNormalizedTitle(instance: Movie) {
      instance.dataValues.normalizedTitle = 
        instance.dataValues.title.toLowerCase();
    }

    @BelongsToMany(() => Actor, () => ActorMovie)
    actors: Actor[];

}
