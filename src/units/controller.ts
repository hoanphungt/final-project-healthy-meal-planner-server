import { JsonController, Get, Param } from 'routing-controllers'
import Unit from './entity';

@JsonController()
export default class UnitController {

//for back-end ony (for testing purposes)
  @Get('/units/:id([0-9]+)')
  getUnit(
    @Param('id') id: number
  ) {
    return Unit.findOne(id)
  }

  @Get('/units')
  getAllUnits() {
    return Unit.find()
  }
}