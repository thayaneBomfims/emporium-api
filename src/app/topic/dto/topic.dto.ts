import { IsNotEmpty } from "class-validator";

export class CreateTopicDto {
    @IsNotEmpty()
    name: string
}

export class UpdateTopicDto extends CreateTopicDto { }