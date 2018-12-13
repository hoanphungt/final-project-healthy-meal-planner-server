import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Recipe from '../recipes/entity';
import User from '../users/entity';

// import User from '../users/entity';
// import { MinLength, IsString, IsEmail, IsNumber } from 'class-validator';

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


  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;
  
}