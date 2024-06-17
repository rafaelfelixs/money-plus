import { BaseErrorException } from './BaseErrorException';
import { CODE_ERROR_RESOURCE_ALREADY_EXISTS } from './CodeErrors/CodeErrors';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';

export class ConflictAlreadyExistsException extends BaseErrorException {
  constructor(error?: ErrorDetailsDto, message?: string) {
    if (error) {
      super(409, [error]);
      return;
    }
    super(409, [
      {
        code: CODE_ERROR_RESOURCE_ALREADY_EXISTS.code,
        message: message || CODE_ERROR_RESOURCE_ALREADY_EXISTS.message,
      },
    ]);
  }
}
