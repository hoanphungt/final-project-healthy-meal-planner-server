import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString } from 'class-validator';
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

  @Column('text', { nullable: true })
  image?: 'string'

<<<<<<< HEAD
  @Column('integer',{nullable: true })
  serves: number
=======
  //the serves are taken from the user table - household column
  // @Column('integer', { nullable: true })
  // serves: number
>>>>>>> c394c46d1c0e216dc807c93e9e437cdd1c291ed2

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

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  recipeIngredients: RecipeIngredient[]

  @OneToMany(() => Day, day => day.recipe)
  days: Day[]

  @OneToMany(() => Rating, rating => rating.recipe)
  ratings: Rating[]
}