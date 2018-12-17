import { JsonController, Param, BadRequestError, Authorized, Get, CurrentUser } from 'routing-controllers'
import Planner from './entity';
import User from '../users/entity';

@JsonController()
export default class PlannerController {

  // Endpoint for testing only
  @Get('/planners')
  getAllPlanners() {
    return Planner.find()
  }

  // Endpoint for testing only
  @Get('/planners/:id([0-9]+)')
  getPlanner(
    @Param('id') id: number
  ) {
    return Planner.findOne(id, { relations: ["days", "days.recipe"] })
  }

  //Endpoint for the front end side
  @Authorized()
  @Get('/myplanner')
  async getPlannerAndDay(
    @CurrentUser() user: User
  ) {
    const planner = await Planner.findOne(user.planner, { relations: ["days", "days.recipe"] })

    if (!planner) throw new BadRequestError(`Planner does not exist`)

    return planner
  }
}



