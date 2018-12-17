import { JsonController, Post, Body, BodyParam, BadRequestError, /*Authorized*/ Get, Param, HttpCode, Authorized, CurrentUser } from 'routing-controllers'
import User from './entity';
import Planner from '../planners/entity';

@JsonController()
export default class UserController {

  @Post('/users')
  @HttpCode(201)
  async signup(
    @Body() newUserData: User,
    @BodyParam("confirmPassword") password_confirmation: string
  ) {
    const { password, ...rest } = newUserData
    if (password !== password_confirmation) throw new BadRequestError('Passwords do not match')
    const entity = User.create(rest)
    await entity.setPassword(password)

    const user = await entity.save()

    const planner = new Planner
      user.planner = planner
      planner.name = "myplanner"
      await planner.save()
      await user.save()
      return {planner, user} 
  }
   //for front-end retrieve the user's household number
  // for future admin implementation and back-end testing:
  // @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOne(id)
  }

  @Get('/users')
  getAllUsers() {
    return User.find()
  }


  @Get('/user')
  @Authorized()
  async getCurrentUser(
  
    @CurrentUser() user: User
  ) {
   const currentUser = await  User.findOne(user)
  
   if(!currentUser) throw new BadRequestError(`User does not exist`)
   return  currentUser
  }
  
  
}
