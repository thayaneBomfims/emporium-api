import { IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from '../../../helpers/regex.helper'

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password)
    password: string;

    @IsNotEmpty()
    telegram: string;

    public_name: string;

    instagram: string;

    facebook: string;
}
