import { JsonController,/* Post, Body, BadRequestError, Authorized*/ Get, Param } from 'routing-controllers'
import Ingredient from './entity';


@JsonController()
export default class IngredientController {

  
  @Get('/ingredients/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return Ingredient.findOne(id)
  }


  @Get('/ingredients')
  getAllIngredients() {
    return Ingredient.find()
  }
}