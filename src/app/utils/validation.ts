import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { EntitySchema } from 'typeorm';

export const validationEntity = async (
    data: object,
): Promise<void> => {

    const validationErrors = await validate(data as EntitySchema);

    if (validationErrors.length > 0) {
        const errorMessages = validationErrors.map((
            error
        ) => Object.values(error.constraints)).join(', ');
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: `Erro de campos: ${errorMessages}`,
        }, HttpStatus.BAD_REQUEST)
    }

}