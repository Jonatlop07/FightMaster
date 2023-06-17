import { Nullable } from '@core/abstraction/type';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class Pagination {
  @IsNumber() @IsOptional() @IsPositive() limit;
  @IsNumber() @IsOptional() @IsPositive() offset;
}

export interface Create<C, R> {
  create(c: C): Promise<R>;
}

export interface Exists<F> {
  exists(params: F): Promise<boolean>;
}

export interface FindOne<F, R> {
  findOne(params: F): Promise<Nullable<R>>;
}

export interface FindAll<F, R> {
  findAll(params: F, pagination?: Pagination): Promise<R[]>;
}

export interface Update<T> {
  update(t: T): Promise<T>;
}

export interface PartialUpdate<T> {
  partialUpdate(previous: T, next: Partial<T>): Promise<T>;
}

export interface PartialUpdateByParams<T, U, Q> {
  partialUpdate(params: Q, updates: U): Promise<T>;
}

export interface Delete<F, R> {
  delete(params: F): Promise<Nullable<R> | void>;
}



