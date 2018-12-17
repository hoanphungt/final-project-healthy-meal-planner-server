import { JsonController, Post, Body, /* BodyParam, BadRequestError, Authorized*/ Get, Param, HttpCode, BadRequestError, } from 'routing-controllers'
import Recipe from './entity';
import RecipeIngredient from '../recipeIngredients/entity';
import Ingredient from '../ingredients/entity';
import Unit from '../units/entity';




@JsonController()
export default class RecipeController {
  
  @Get('/recipes/:id([0-9]+)')
  async getRecipe(
    @Param('id') id: number
  ) {
    const recipe = Recipe.findOne(
      id, 
      { 
        relations: ["recipeIngredients", "recipeIngredients.ingredient", "recipeIngredients.unit", "ratings"]
      })

    return await recipe 
  }


  @Get('/recipes')
  async getAllRecipes() {
    return await Recipe.find({ 
      relations: ["ratings"]
    })
  }


  


  // @Post('/recipes')
  // @HttpCode(201)
  // async createRecipe(
  //   @Body() recipe: Recipe,
  // ) {

  //   await recipe.save()
  //   return recipe
  // }

  @Post('/recipes')
  @HttpCode(201)
  async createRecipe(
    @Body() 
    newRecipe :{ 
      // recipe entity
      name, 
      image,
      serves,
      cookingTime,
      instructions,
      diffLevel,
      season,
      dietary, 
      // ingredients ID
     // ingredientName : [string] ,
      ingredientName  ,

      // units ID 
      // unitName:[string],
      unitName,

      // recipesIngredient
      recipeIngredients : [number]
      // quantity,
     },
  ) {

    const recipe = new Recipe
    recipe.name = newRecipe.name
    recipe.image = newRecipe.image
    recipe.serves = newRecipe.serves
    recipe.instructions = newRecipe.instructions
    recipe.diffLevel = newRecipe.diffLevel
    recipe.season = newRecipe.season
    recipe.dietary = newRecipe.dietary
    
    const ingredient = await Ingredient.findOne(newRecipe.ingredientName)
    if(!ingredient) throw new BadRequestError
    const unit = await Unit.findOne(newRecipe.unitName)
    if(!unit) throw new BadRequestError

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

   
    // const recipeIngredient = new RecipeIngredient
    //   //  recipeIngredient.quantity = a
    //     recipeIngredient.recipe = recipe
    //     recipeIngredient.ingredient = ingredient
    //     recipeIngredient.unit = unit
    //     recipeIngredient.save()

    return  typeof(newRecipe.recipeIngredients)
  }
}




// @Put("/recipe/:id/ingredient/:ingredient_id")
// async updateRecipe(
//  @Param('id') id: number , 
//  @Param('ingredient_id')  ingredient_id : number )
//  {
//     const ingredient = await Ingredient.findOne(ingredient_id)
//     if (!ingredient) throw new NotFoundError('Cannot find ingredient')
//     const recipe = await Recipe.findOne(id)
//     if (!recipe) throw new NotFoundError('Cannot find recipe')

//     //recipe.ingredients= [ingredient]
//     recipe.ingredients.push(ingredient)
//     return recipe.save()

//  }
