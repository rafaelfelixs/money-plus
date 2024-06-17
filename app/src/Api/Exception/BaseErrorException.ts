import { ErrorDetailsDto } from '../Dto/ErrorDetailsDto';

export abstract class BaseErrorException extends Error {
  protected constructor(statusCode: number, errors: ErrorDetailsDto[]) {
    super(errors ? String(errors) : 'SERVER_INTERNAL_ERROR');
    this.statusCode = statusCode;
    this.errors = errors;
  }

  public statusCode: number;
  public errors: ErrorDetailsDto[];
}
