import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Recipe from '../recipes/entity';
import Planner from '../planners/entity';
// import User from '../users/entity';
// import { MinLength, IsString, IsEmail, IsNumber } from 'class-validator';

@Entity()
export default class Day extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('date', {nullable: true})
  plannerDay: Date

  @ManyToOne(() => Recipe, recipe => recipe.days)
  recipe: Recipe;

  @ManyToOne(() => Planner, planner => planner.days)
  planner: Planner;


  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;
  
}