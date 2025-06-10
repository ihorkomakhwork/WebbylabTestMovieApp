import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { Movie } from './movieModel';
import { ActorMovie } from './actorMovieModel';

@Table({ tableName: 'Actor' })
export class Actor extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @BelongsToMany(() => Movie, () => ActorMovie)
  movies: Movie[];
}
