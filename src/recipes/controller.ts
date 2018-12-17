import { JsonController, Post, Body, Get, Param, HttpCode, BadRequestError } from 'routing-controllers'
import Recipe from './entity';
import RecipeIngredient from '../recipeIngredients/entity';
import Ingredient from '../ingredients/entity';
import Unit from '../units/entity';


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
    @Body()
    newRecipe: {
      // recipe entity
      name,
      image,
      cookingTime,
      instructions,
      diffLevel,
      season,
      dietary,
      // ingredients ID
      // ingredient : [string] ,
      ingredient,

      // units ID 
      // unit:[string],
      unit,

      // recipesIngredient
      //recipeIngredients : [number]
      quantity,
    },
  ) {

    const recipe = new Recipe
    recipe.name = newRecipe.name
    recipe.image = newRecipe.image
    recipe.instructions = newRecipe.instructions
    recipe.diffLevel = newRecipe.diffLevel
    recipe.season = newRecipe.season
    recipe.dietary = newRecipe.dietary

    const ingredient = await Ingredient.findOne(newRecipe.ingredient)
    if (!ingredient) throw new BadRequestError
    const unit = await Unit.findOne(newRecipe.unit)
    if (!unit) throw new BadRequestError

    await recipe.save()
    // newRecipe.recipeIngredients.forEach( 
    //   a => console.log(a)
    //   {
    //     const recipeIngredient = new RecipeIngredient
    //     recipeIngredient.quantity = a
    //     recipeIngredient.recipe = recipe
    //     recipeIngredient.save()
    //   }
    //   )


    const recipeIngredient = new RecipeIngredient
    recipeIngredient.quantity = newRecipe.quantity
    recipeIngredient.recipe = recipe
    recipeIngredient.ingredient = ingredient
    recipeIngredient.unit = unit
    recipeIngredient.save()

    return { recipe, recipeIngredient }
  }
}




//http :4000/recipes name=test32 image=Image cookingTime=32 instructions=DoThisThatAndThis diffLevel=easyPeasy season=winter dietary=carnivore ingredient=14 unit=5 quantity=500
