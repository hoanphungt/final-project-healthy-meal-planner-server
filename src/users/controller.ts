import { JsonController, Post, Body, BodyParam, BadRequestError, /*Authorized*/ Get, Param, HttpCode } from 'routing-controllers'
import User from './entity';
import Planner from '../planners/entity';


@JsonController()
export default class UserController {

  // @Post('/users')
  // async signup(
  //   @Body() newUserData: User,
  //   @BodyParam("confirmPassword") password_confirmation: string
  // ) {
  //   const { password, ...rest } = newUserData
  //   if (password !== password_confirmation) throw new BadRequestError('Passwords do not match')
  //   const entity = User.create(rest)
  //   await entity.setPassword(password)

  //   const user = await entity.save()

  //   return user
  // }
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







  //   for admin implementation:
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
}

// @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments/:commentId([0-9]+)')
// async getComment(
//   @Param('commentId') id: number
// ) {
//   return await MyComment.findOne(id, { relations: ["user", "ticket"] })
// }
