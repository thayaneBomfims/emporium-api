import { IsNotEmpty } from "class-validator";
import { UserEntity } from "../../user/entity/user.entity";

export class UpdateTopicDto {
    @IsNotEmpty()
    name: string
}

export class CreateTopicDto extends UpdateTopicDto {

    @IsNotEmpty()
    scientific: boolean

    @IsNotEmpty()
    user: UserEntity
}