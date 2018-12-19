import { JsonController, Body,/* Post,  BadRequestError*/ NotFoundError, Patch, Get, Param, Authorized, CurrentUser, QueryParam, BadRequestError, Delete } from 'routing-controllers'
import Day from './entity';
import User from '../users/entity';
import Recipe from '../recipes/entity';
import Planner from '../planners/entity';
import { createDay } from '../logic';

@JsonController()
export default class DayController {

  // Endpoint for testing only
  @Get('/days/:id([0-9]+)')
  getDay(
    @Param('id') id: number
  ) {
    return Day.findOne(id)
  }
  
  // Endpoint for testing only
  @Get('/days')
  getAllDays() {
    return Day.find()
  }
  // Change the recipe asociated with a day 
  // Body should be the recipe id, Param the day id
  @Authorized()
  @Patch('/days/:id([0-9]+)')
  async changeRecipeOftheDay(
    @CurrentUser() user: User,
    @Param('id') dayId: number,
    @Body() recipeId: number,
  ) {
    const day = await Day.findOne(dayId, {
      where: { planner: user.planner }
    })
    if (!day) throw new NotFoundError(`Day does not exist`)

    const recipe = await Recipe.findOne(recipeId)
    if (!recipe) throw new NotFoundError(`Recipe does not exist`)

    day.recipe = recipe
    await day.save()
    return day
  }

  // Return 7 days, starting from monday of the current week till sunday. 
  // Offset should be +7 or -7.
  @Get('/myplanner')
  @Authorized()
  async getDays(
    @CurrentUser() user: User,
    @QueryParam("limit") limit: number = 7,
    @QueryParam("offset") offset: number = 0,
  ) {

    const today = new Date

    //if there is an offset value change "today"
    if (offset)  {today.setDate( today.getDate() + offset  )}
    const plannerUser = await Planner.findOne(user.planner)
    //create new days based on offset value
    const recipList = await Recipe.find()
    for (let i = 0; i < 7; i++) {
      await createDay(plannerUser, today, i, user, recipList)
    }

    const dayToday = await Day.findOne(
      {
        where:
        {
          day: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
          planner: user.planner
        }
      })

    if (!dayToday) { throw new BadRequestError }
    

// Create 7 days starting from today, only if there is no day with same date
// Make a relation between the days and the planner of current user

    const orderedDay = await Day.find({
      relations: ["recipe"],
      where: {
        planner: plannerUser,
      },
      order: {
        day: "ASC",
      },
      cache: true
    });


  orderedDay.findIndex(a => a.day === dayToday.day) - today.getDay() + 1
    
    // TO improve - avoid negative offset for first user
    if (offset<0) { offset =0}

    const planner = await Day.find({
      relations: ["recipe", "recipe.recipeIngredients", "recipe.recipeIngredients.ingredient", "recipe.recipeIngredients.unit"],
      where: {
        planner: plannerUser,
      },
      order: {
        day: "ASC",
      },
      skip: offset,
      take: limit,
      cache: true
    });
    const total =orderedDay.length

    return {planner,total, today}
  }


}

