import { IsNotEmpty } from "class-validator";
import { TrailEntity } from "../../trail/entity/trail.entity";
import { UserEntity } from "../../user/entity/user.entity";

export class UpdateContentDto {

    /**
     * Content short title
     * @example As Ervas Medicinais
     */
    @IsNotEmpty()
    name: string;
}

export class CreateContentDto extends UpdateContentDto {

    /**
     * Trail id
     * @example 117b820b-02ed-4aee-be11-0db7b2c01b51
     */
    @IsNotEmpty()
    trail: TrailEntity;

    /**
     * User id
     * @example 117b820b-02ed-4aee-be11-0db7b2c01b51
     */
    @IsNotEmpty()
    user: UserEntity;
}