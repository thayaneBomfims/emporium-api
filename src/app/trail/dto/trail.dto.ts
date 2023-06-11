import { IsNotEmpty } from "class-validator";
import { TopicEntity } from "../../topic/entity/topic.entity";
import { UserEntity } from "../../user/entity/user.entity";

export class UpdateTrailDto {
    @IsNotEmpty()
    name: string;

    description: string;
}

export class CreateTrailDto extends UpdateTrailDto {
    @IsNotEmpty()
    topic: TopicEntity;

    @IsNotEmpty()
    user: UserEntity;
}