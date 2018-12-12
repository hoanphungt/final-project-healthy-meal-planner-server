import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import {IsString } from 'class-validator';
import RecipeIngredient from '../recipeIngredients/entity';

@Entity()
export default class Unit extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.unit, {eager:true}) 
  recipeIngredients: RecipeIngredient[]

}