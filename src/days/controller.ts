import { JsonController, Body,/* Post,  BadRequestError*/ NotFoundError, Patch, Get, Param, Authorized, CurrentUser, QueryParam } from 'routing-controllers'
import Day from './entity';
import User from '../users/entity';
import Recipe from '../recipes/entity';
import Planner from '../planners/entity';

@JsonController()
export default class DayController {

  @Get('/days/:id([0-9]+)')
  getDay(
    @Param('id') id: number
  ) {
    return Day.findOne(id)
  }

  @Get('/days')
  getAllDays() {
    return Day.find()
  }

  @Authorized()
  @Patch('/days/:id([0-9]+)')
  async changeRecipeOftheDay(
    @CurrentUser() user: User,
    @Param('id') dayId: number,
    @Body() recipeId : number,
  ) {
    const day = await Day.findOne(dayId,{where :{ planner : user.planner }
     })
     if (!day) throw new NotFoundError(`Day does not exist`)

    const recipe = await Recipe.findOne(recipeId)
    if (!recipe) throw new NotFoundError(`Recipe does not exist`) 

    day.recipe = recipe
    await day.save()
    return day
  }


    @Get('/myplanner')
    @Authorized()
    async getDaysP(
      @CurrentUser() user: User,
      @QueryParam("limit") limit: number = 7,
      @QueryParam("offset") offset: number = 0,
    ) {

      const plannerUser = await Planner.findOne(user.planner)
      const planner= await Day.find({ 
        relations: ["recipe"],
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
      return planner
    }

}
