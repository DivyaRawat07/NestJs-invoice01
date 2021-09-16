import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";
import { userRole } from "../../user.model";
//import { userRole } from "src/auth/users/models/user";

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsNotEmpty()
    password: string;

    @Field()
    userRole:userRole

}