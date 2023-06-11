import { IsNotEmpty } from "class-validator";
import { TrailEntity } from "../../trail/entity/trail.entity";
import { UserEntity } from "../../user/entity/user.entity";

export class UpdateContentDto {
    @IsNotEmpty()
    name: string;
}

export class CreateContentDto extends UpdateContentDto {
    @IsNotEmpty()
    trail: TrailEntity;

    @IsNotEmpty()
    user: UserEntity;
}