import { JsonController,/* Post, Body, BadRequestError, Authorized*/ Get, Param } from 'routing-controllers'
import RecipeIngredient from './entity';


@JsonController()
export default class RecipeIngredientController {

  
  @Get('/recipeingredients/:id([0-9]+)')
  getRecipeIngredients(
    @Param('id') id: number
  ) {
    return RecipeIngredient.findOne(id)
  }


  @Get('/recipeingredients')
  getAllRecipeIngredients() {
    return RecipeIngredient.find()
  }
}