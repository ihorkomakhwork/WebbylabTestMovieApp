import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}
