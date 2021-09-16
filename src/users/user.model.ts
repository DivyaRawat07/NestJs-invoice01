import { Field, ObjectType } from "@nestjs/graphql";
import{Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

export enum userRole {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    CASHIER = 'CASHIER',
    USER = "USER"
  }
  
@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    userId: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    password:string

    @Field()
    @Column()
    email: string;

    @Field({ nullable: true })
  @Column({
    type: "enum",
    enum: userRole,
    default: userRole.USER
  })
  userRole: userRole;

}