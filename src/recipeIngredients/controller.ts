import { JsonController, Get, Param } from 'routing-controllers'
import RecipeIngredient from './entity';

@JsonController()
export default class RecipeIngredientController {

  // Endpoint for testing only
  @Get('/recipeingredients/:id([0-9]+)')
  getRecipeIngredients(
    @Param('id') id: number
  ) {
    return RecipeIngredient.findOne(id, { relations: ["recipe", "ingredient", "unit"] })
  }

  // Endpoint for testing only
  @Get('/recipeingredients')
  getAllRecipeIngredients() {
    return RecipeIngredient.find()
  }
}