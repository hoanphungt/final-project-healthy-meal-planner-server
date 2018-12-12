import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Day from '../days/entity';
// import User from '../users/entity';
// import { MinLength, IsString, IsEmail, IsNumber } from 'class-validator';

@Entity()
export default class Planner extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @OneToMany(() => Day, day => day.planner, {eager:true}) 
  days: Day[]


  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;
  
}