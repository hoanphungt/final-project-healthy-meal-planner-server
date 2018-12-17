import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString } from 'class-validator';
// import Planner from '../planners/entity';
import RecipeIngredient from '../recipeIngredients/entity';
import Day from '../days/entity';
import Rating from '../ratings/entity';

@Entity()
export default class Recipe extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @Column('text',{ nullable: true })
  image?: 'string'

  @Column('integer', { nullable: true })
  serves: number

  @Column('integer', { nullable: true })
  cookingTime: number

  @IsString()
  @Column('text', { nullable: true })
  instructions: string

  @IsString()
  @Column('text', { nullable: true })
  diffLevel: string

  @IsString()
  @Column('text', { nullable: true })
  season: string

  @IsString()
  @Column('text', { nullable: true })
  dietary: string

  // @ManyToOne(() => Planner, planner => planner.recipes)
  // planner: Planner;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  recipeIngredients: RecipeIngredient[]

  @OneToMany(() => Day, day => day.recipe)
  days: Day[]

  @OneToMany(() => Rating, rating => rating.recipe)
  ratings: Rating[]

}