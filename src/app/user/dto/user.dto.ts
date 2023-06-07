import { IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from '../../../helpers/regex.helper'
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    /**
     * User private real name
     * @example Jon Doe
     */
    @IsNotEmpty()
    name: string;

    /**
     * User email - will be usefull for login
     * @example jon_doe@gmail.com
     */
    @IsNotEmpty()
    email: string;

    /**
     * User password - respecting the rules
     * @example passWord!123
     */
    @IsNotEmpty()
    @Matches(RegExHelper.password)
    password: string;

    /**
     * User telegram link or group
     * @example https://web.telegram.org/k/#-455627078
     */
    @IsNotEmpty()
    telegram: string;

    /**
     * User public or artistic name
     * @example Magic Doe
     */
    public_name: string;

    /**
     * User instagram link
     * @example https://www.instagram.com/jonhDoe/
     */
    instagram: string;

    /**
     * User facebook link
     * @example https://www.facebook.com/jonhDoe/
     */
    facebook: string;
}
