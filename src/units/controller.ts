import { JsonController, Get, Param } from 'routing-controllers'
import Unit from './entity';

@JsonController()
export default class UnitController {

  // Endpoint for testing only
  @Get('/units/:id([0-9]+)')
  getUnit(
    @Param('id') id: number
  ) {
    return Unit.findOne(id)
  }

  // Endpoint for testing only
  @Get('/units')
  getAllUnits() {
    return Unit.find()
  }
}