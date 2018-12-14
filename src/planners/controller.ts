import { JsonController, Param, /* Post, Body, HttpCode,*/ BadRequestError, Authorized, Get, CurrentUser } from 'routing-controllers'
import Planner from './entity';
import User from '../users/entity';
//import Day from '../days/entity';





@JsonController()
export default class PlannerController {

//  @Authorized()
//  @Get('/myplanner')
//   getMyPlanner(
//     @CurrentUser() user: User
//   ) {
//     return Planner.findOne(user.planner)
//   }


  @Get('/planners')
  getAllPlanners() {
    return Planner.find()
  }   
  
  
  @Get('/planners/:id([0-9]+)')
  getPlanner(
    @Param('id') id: number
  ) {
    return Planner.findOne(id, { relations : ["days"] } )
  }  

  @Authorized()
  @Get('/myplanner')
  async getPlannerAndDay(
    @CurrentUser() user: User
  ) {
   const planner = await  Planner.findOne(user.planner, { relations : ["days"] })

   if(!planner) throw new BadRequestError(`Planner does not exist`)
  
 
    //await planner.save()
    return  planner
}

  // @Post('/planners')
  // @HttpCode(201)
  // async createPlanner(
  //   @Body() planner: Planner,
  //   @Param('userId') userId: number,
  // ) {
  //   const user = await User.findOne(userId)
  //   if(!user) throw new BadRequestError(`User does not exist`)

  //   user.planner = planner
  //   // planner = new Planner
  //   await planner.save()
  //   await user.save()
  //   return {planner, user}
  // }
}



  // @Post('/users/:userId([0-9]+)/planners')
  // @HttpCode(201)
  // async createPlanner(
  //   @Body() planner: Planner,
  //   @Param('userId') userId: number,
  // ) {
  //   const user = await User.findOne(userId)
  //   if(!user) throw new BadRequestError(`User does not exist`)

  //   user.planner = planner
  //   // planner = new Planner
  //   await planner.save()
  //   await user.save()
  //   return {planner, user}
  // }


