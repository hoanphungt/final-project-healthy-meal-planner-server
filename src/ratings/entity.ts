import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Recipe from '../recipes/entity';
import User from '../users/entity';

@Entity()
export default class Rating extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer')
  rating: number

  @ManyToOne(() => Recipe, recipe => recipe.ratings)
  recipe: Recipe;

  @ManyToOne(() => User, user => user.ratings)
  user: User;
}