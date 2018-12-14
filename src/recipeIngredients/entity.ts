import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,  ManyToOne } from 'typeorm'
import Recipe from '../recipes/entity';
import Ingredient from '../ingredients/entity';
import Unit from '../units/entity';

@Entity()
export default class RecipeIngredient extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('float8')
  quantity: number


  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient: Ingredient;

  @ManyToOne(() => Unit, unit => unit.recipeIngredients)
  unit: Unit;
}

// { eager: true }