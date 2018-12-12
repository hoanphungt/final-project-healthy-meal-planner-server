import { JsonController, Post, Param, Get, Body } from 'routing-controllers'
import {Recipe} from './entity';

@JsonController()
export default class RecipeController {

  @Get("/recipes")
  getAll() {
     return Recipe.find();
  }

  @Get("/recipe/:id")
  getOne(@Param("id") id: number) {
     return Recipe.findOne(id);
  }

  @Post("/recipes")
  post(@Body() recipe: Recipe) {
     return Recipe.insert(recipe);
  }

}