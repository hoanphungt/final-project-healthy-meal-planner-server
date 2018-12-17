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

//   @Authorized()
//   @Get('/myplanner')
//   async getPlannerAndDay(
//     @CurrentUser() user: User
//   ) {
//    const planner = await  Planner.findOne(user.planner, { relations : ["days" , "days.recipe"] })

//    if(!planner) throw new BadRequestError(`Planner does not exist`)
//    return  planner
// }
@Authorized()
@Get('/myplanner')
async getPlannerAndDay(
  // @QueryParam("limit") limit: number = 9,
  // @QueryParam("offset") offset: number = 0,
  @CurrentUser() user: User
) {
 const planner = await  Planner.findOne(user.planner, { relations : ["days" , "days.recipe"] })

 if(!planner) throw new BadRequestError(`Planner does not exist`)
 return  planner
}
}



// @Get('/events')
// async events(
//   @QueryParam("limit") limit: number = 9,
//   @QueryParam("offset") offset: number = 0,
// ) {
//   const q = Event.createQueryBuilder()
//     .andWhere("end_date >= NOW()")
//     .orderBy("start_date", "ASC")
//     .limit(limit)
//     .offset(offset)

//   const total = await q.getCount()
//   const events = await q.getMany()

//   return { events, total }
// }