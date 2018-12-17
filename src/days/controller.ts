import { JsonController, Get, Param } from 'routing-controllers'
import Day from './entity';


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
}