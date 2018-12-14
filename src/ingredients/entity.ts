import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import {IsString } from 'class-validator';
import RecipeIngredient from '../recipeIngredients/entity';

@Entity()
export default class Ingredient extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient) 
  recipeIngredients: RecipeIngredient[]

}

//{eager:true}