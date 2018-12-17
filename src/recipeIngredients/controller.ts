import { JsonController, Get, Param } from 'routing-controllers'
import RecipeIngredient from './entity';

@JsonController()
export default class RecipeIngredientController {

  @Get('/recipeingredients/:id([0-9]+)')
  getRecipeIngredients(
    @Param('id') id: number
  ) {
    return RecipeIngredient.findOne(id, { relations: ["recipe","ingredient","unit"]})
  }

  @Get('/recipeingredients')
  getAllRecipeIngredients() {
    return RecipeIngredient.find()
  }
}