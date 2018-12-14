import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'
import Day from '../days/entity';
// import User from '../users/entity';
// import { MinLength, IsString, IsEmail, IsNumber } from 'class-validator';

@Entity()
export default class Planner extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @OneToMany(() => Day, day => day.planner) 
  days: Day[]


  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;
  
}