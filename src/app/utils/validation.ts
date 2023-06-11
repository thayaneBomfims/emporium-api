import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { MessagesHelper } from '../../helpers/messages.helper';
import { EntitySchema } from 'typeorm';

export const validationEntity = async (data: object): Promise<void> => {
  const validationErrors = await validate(data as EntitySchema);

  if (validationErrors.length > 0) {
    const errorMessages = validationErrors
      .map((error) => Object.values(error.constraints))
      .join(', ');
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `Erro de campos: ${errorMessages}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validationUserByEmail = async (
  userEmail: string,
  tokenEmail: string,
): Promise<void> => {
  if (userEmail !== tokenEmail) {
    throw new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      error: MessagesHelper.USER_EDIT_ERROR,
    });
  }
};
