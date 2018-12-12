import { JsonController, Post, Param, Get, Body } from 'routing-controllers'
import {Ingredient} from './entity';

@JsonController()
export default class IngredientController {

  @Get("/ingredients")
  getAll() {
     return Ingredient.find();
  }

  @Get("/ingredient/:id")
  getOne(@Param("id") id: number) {
     return Ingredient.findOne(id);
  }

  @Post("/ingredients")
  post(@Body() ingredient: Ingredient) {
     return Ingredient.insert(ingredient);
  }

  @Get("/ingredient")
  getByName(@Body() id: Ingredient["id"]) {
     return Ingredient.findOne(id);
  }

}