import { IsNotEmpty } from "class-validator";

export class UpdateTrailDto {
    @IsNotEmpty()
    name: string;
}

export class CreateTrailDto extends UpdateTrailDto {
    @IsNotEmpty()
    topic: string;
}