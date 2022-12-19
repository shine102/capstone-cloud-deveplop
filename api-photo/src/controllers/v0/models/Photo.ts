import {Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey} from 'sequelize-typescript';
import {User} from './User';  


@Table
export class Photo extends Model<Photo>{
    @ForeignKey(() => User)
    @Column
    public userEmail!: string;

    @Column
    public url!: string;

    @Column
    public isPublished!: boolean;

    @Column
    @CreatedAt
    public createdAt: Date = new Date();

    @Column
    @UpdatedAt
    public updatedAt: Date = new Date();
}
