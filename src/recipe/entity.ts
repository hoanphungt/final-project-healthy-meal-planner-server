import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import {Ingredient} from "../ingredient/entity";


@Entity()
export  class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text', {nullable:true})
    instructions: string;

    @Column('text', {nullable:true})
    level: string;

    @Column('integer', {nullable:true})
    time: number;

    @Column('text', {nullable:true})
    season: string;

    @Column('text', {nullable:true})
    dietary: string;

    @ManyToMany(() => Ingredient, ingredient => ingredient.recipes, {
    // @ManyToMany(type => Ingredient, ingredient => ingredient.recipes, {
        eager: true
    })
    @JoinTable()  
    ingredients: Ingredient[];
}