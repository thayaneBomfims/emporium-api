import { IsNotEmpty } from "class-validator";
import { TopicEntity } from "../../topic/entity/topic.entity";
import { UserEntity } from "../../user/entity/user.entity";

export class UpdateTrailDto {

    /**
     * Trail short title
     * @example Grandes nomes da ciência
     */
    @IsNotEmpty()
    name: string;

    /**
     * Trail description
     * @example Aqui você verá conteúdos sobre....
     */
    description: string;
}

export class CreateTrailDto extends UpdateTrailDto {

    /**
     * Topic id
     * @example 117b820b-02ed-4aee-be11-0db7b2c01b51
     */
    @IsNotEmpty()
    topic: TopicEntity;

    /**
     * User id
     * @example 117b820b-02ed-4aee-be11-0db7b2c01b51
     */
    @IsNotEmpty()
    user: UserEntity;
}