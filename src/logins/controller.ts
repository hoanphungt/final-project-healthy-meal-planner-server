import { IsString } from 'class-validator'
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers'
import { sign } from '../jwt'
import User from '../users/entity'
import {createDay} from '../logic'
import Planner from '../planners/entity';
import Recipe from '../recipes/entity';

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() { email, password }: AuthenticatePayload
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user || !user.id) throw new BadRequestError('A user with this email does not exist')

    if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')

    const jwt = sign({ id: user.id })


    const planner = await  Planner.findOne(user.planner)

    if(!planner) throw new BadRequestError(`Planner does not exist`)
    const today= new Date()
    const recipList = await Recipe.find()
    for ( let i=0; i<7; i++) {
   createDay ( planner,today, i,user, recipList)}
 
    

    return { jwt }
  }
}
