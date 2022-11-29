import { IsNotEmpty } from "class-validator";

export class UpdateContentDto {
    @IsNotEmpty()
    name: string;
}

export class CreateContentDto extends UpdateContentDto {
    @IsNotEmpty()
    trail: string;
}