import { BaseErrorException } from './BaseErrorException';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';

export class BadRequestException extends BaseErrorException {
  constructor(error: ErrorDetailsDto, message?: string) {
    if (message) {
      error.message = message;
    }

    super(400, [error]);
  }
}
