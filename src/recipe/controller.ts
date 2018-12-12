import { JsonController, Post, Param, Get, Body, NotFoundError, Put } from 'routing-controllers'
import {Recipe} from './entity';
import {Ingredient} from '../ingredient/entity';

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

  @Put("/recipe/:id/ingredient/:ingredient_id")
  async updateRecipe(
   @Param('id') id: number , 
   @Param('ingredient_id')  ingredient_id : number )
   {
      const ingredient = await Ingredient.findOne(ingredient_id)
      if (!ingredient) throw new NotFoundError('Cannot find ingredient')
      const recipe = await Recipe.findOne(id)
      if (!recipe) throw new NotFoundError('Cannot find recipe')

      //recipe.ingredients= [ingredient]
      recipe.ingredients.push(ingredient)
      return recipe.save()

   }

   



}
