import { BaseErrorException } from './BaseErrorException';
import { CODE_ERROR_ACCESS_DENIED } from './CodeErrors/CodeErrors';

export class AccessDeniedException extends BaseErrorException {
  constructor() {
    super(403, [CODE_ERROR_ACCESS_DENIED]);
  }
}
