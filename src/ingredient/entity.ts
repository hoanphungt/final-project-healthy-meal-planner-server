import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Recipe} from "../recipe/entity";

@Entity()
export class Ingredient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    // @ManyToMany(type => Recipe, recipe => recipe.ingredients)
   @ManyToMany(() => Recipe, recipe => recipe.ingredients)

    recipes: Recipe[];

}