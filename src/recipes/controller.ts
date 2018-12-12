import { JsonController, /*Post, Body, BodyParam, BadRequestError, Authorized*/ Get, Param } from 'routing-controllers'
import Planner from './entity';
// import Recipe from '../recipes/entity';


@JsonController()
export default class RecipeController {

  
  @Get('/recipes/:id([0-9]+)')
  getRecipe(
    @Param('id') id: number
  ) {
    return Planner.findOne(id)
  }


  @Get('/recipes')
  getAllRecipes() {
    return Planner.find()
  }

  // @Post('/planners/:plannerId([0-9]+)/recipes')
  // @HttpCode(201)
  // async createPlanner(
  //   @Body() recipe: Recipe,
  //   @Param('plannerId') plannerId: number,
  // ) {
  //   const planner = await Planner.findOne(plannerId)
  //   if(!planner) throw new BadRequestError(`planner does not exist`)

  //   planner.recipe = planner
  //   // planner = new Planner
  //   await planner.save()
  //   await planner.save()
  //   return {planner, planner}
  // }
}

