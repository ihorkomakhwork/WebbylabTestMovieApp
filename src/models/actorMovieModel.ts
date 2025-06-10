import { Table, Model, ForeignKey, Column, DataType } from 'sequelize-typescript';
import { Movie } from './movieModel';
import { Actor } from './actorModel';

@Table({
  tableName: 'ActorMovie',
  timestamps: false
})
export class ActorMovie extends Model {
    @ForeignKey(() => Actor)
    @Column({ type: DataType.INTEGER })
    actorId: number;
  
    @ForeignKey(() => Movie)
    @Column({ type: DataType.INTEGER })
    movieId: number;
}
