import { JsonController,/* Post, Body, BadRequestError, HttpCode,*/ Authorized, Get, CurrentUser,  } from 'routing-controllers'
import Planner from './entity';
import User from '../users/entity';


@JsonController()
export default class PlannerController {

 @Authorized()
 @Get('/myplanner')
  getMyPlanner(
    @CurrentUser() user: User
  ) {
    return Planner.findOne(user.planner)
  }


  
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

