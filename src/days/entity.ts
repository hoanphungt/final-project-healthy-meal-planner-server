import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Recipe from '../recipes/entity';
import Planner from '../planners/entity';

@Entity()
export default class Day extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('date', { nullable: true })
  day: Date

  @ManyToOne(() => Recipe, recipe => recipe.days)
  recipe: Recipe;

  @ManyToOne(() => Planner, planner => planner.days)
  planner: Planner;
}