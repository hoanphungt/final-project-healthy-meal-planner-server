import { JsonController,/* Post, Body, HttpCode,*/ BadRequestError, Authorized, Get, Param, CurrentUser } from 'routing-controllers'
import Planner from './entity';
import User from '../users/entity';
import Day from '../days/entity';


async function createDay (planner, date, increment, user) {

  const day = new Day
 // check if this planner alraedy has a day with current Date
 const checkingDay = await Day.findOne(
   {where :
  { plannerDay :`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+increment}` ,
    planner : user.planner
  }
  })

   if(!checkingDay) {
    day.planner = planner
    day.plannerDay = new Date()
    day.plannerDay.setDate( date.getDate() + increment )
     await day.save()
   }

  else { console.log('DAY ALREADY EXIST')}
}



@JsonController()
export default class PlannerController {

  
  @Get('/planners/:id([0-9]+)')
  getPlanner(
    @Param('id') id: number
  ) {
    return Planner.findOne(id)
  }


  @Get('/planners')
  getAllPlanners() {
    return Planner.find()
  }    

  @Authorized()
  @Get('/users/planners')
  async getPlannerAndDay(
    @CurrentUser() user: User
  ) {
   const planner = await  Planner.findOne(user.planner)
   if(!planner) throw new BadRequestError(`Planner does not exist`)
  
  const today= new Date()
   for ( let i=1; i<8; i++) {
  createDay ( planner,today, i,user)
   }
    await planner.save()
    return {planner}
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


