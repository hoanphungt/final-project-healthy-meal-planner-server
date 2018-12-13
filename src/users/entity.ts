import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import Planner from '../planners/entity';
import Rating from '../ratings/entity';

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(4)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  // @IsNumber()
  @Column('integer')
  adultsNumber: number

  // @IsNumber()
  @Column('integer')
  childrenNumber: number

  @OneToOne(() => Planner, { eager: true })
  @JoinColumn()
  planner: Planner;

  @OneToMany(() => Rating, rating => rating.user, {eager:true}) 
  ratings: Rating[]
}