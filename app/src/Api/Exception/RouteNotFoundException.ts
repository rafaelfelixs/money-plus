import { BaseErrorException } from './BaseErrorException';
import { CODE_ERROR_NOT_FOUND } from './CodeErrors/CodeErrors';

export class RouteNotFoundException extends BaseErrorException {
  constructor() {
    super(404, [CODE_ERROR_NOT_FOUND]);
  }
}
