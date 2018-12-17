import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'
import Day from '../days/entity';

@Entity()
export default class Planner extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable : true})
  name: string

  @OneToMany(() => Day, day => day.planner)
  days: Day[]
}