import { JsonController, Post, Body, Get, Param, HttpCode, } from 'routing-controllers'
import Recipe from './entity';

@JsonController()
export default class RecipeController {

  //endpoint for front-end
  @Get('/recipes/:id([0-9]+)')
  async getRecipe(
    @Param('id') id: number
  ) {
    const recipe = await Recipe.findOne(
      id,
      {
        relations: ["recipeIngredients", "recipeIngredients.ingredient", "recipeIngredients.unit", "ratings"]
      })

    return recipe
  }
  //endpoint for front-end
  @Get('/recipes')
  async getAllRecipes() {
    return await Recipe.find({
      relations: ["ratings"]
    })
  }

  //for back-end only
  @Post('/recipes')
  @HttpCode(201)
  async createRecipe(
    @Body() recipe: Recipe,
  ) {
    await recipe.save()
    return recipe
  }
}

