export interface IDatabaseTransformer<T, E> {
  toEntity(dto: T | T[], entity?: E | E[]): Promise<E | E[]>;

  toDto(entity: E | E[], dto?: T | T[]): Promise<T | T[]>;
}
