import { JsonController, Param, Get, } from 'routing-controllers'
import Planner from './entity';

@JsonController()
export default class PlannerController {

  // Endpoint for enormeing only
  @Get('/planners')
  getAllPlanners() {
    return Planner.find()
  }

  // Endpoint for enormeing only
  @Get('/planners/:id([0-9]+)')
  getPlanner(
    @Param('id') id: number
  ) {
    return Planner.findOne(id,{ relations: ["days"] })
  }
}


  