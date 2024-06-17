import { BaseErrorException } from './BaseErrorException';
import { CODE_ERROR_RESOURCE_ALREADY_EXISTS } from './CodeErrors/CodeErrors';
import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';

export class ResourceAlreadyExistsException extends BaseErrorException {
  constructor(messages: string[]) {
    const errors: ErrorDetailsDto[] = messages.map((message) => {
      return {
        code: CODE_ERROR_RESOURCE_ALREADY_EXISTS.code,
        message: message || CODE_ERROR_RESOURCE_ALREADY_EXISTS.message,
      };
    });
    super(409, errors);
  }
}
