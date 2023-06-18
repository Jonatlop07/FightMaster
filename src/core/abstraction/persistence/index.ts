import { Nullable } from '@core/abstraction/type';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class Pagination {
  @IsNumber() @IsOptional() @IsPositive() limit;
  @IsNumber() @IsOptional() @IsPositive() offset;
}

export interface Create<EntityDetailsDTO, EntityDTO> {
  create(c: EntityDetailsDTO): Promise<EntityDTO>;
}

export interface Exists<EntityFilterParamsDTO> {
  exists(params: EntityFilterParamsDTO): Promise<boolean>;
}

export interface FindOne<EntityFilterParamsDTO, EntityDTO> {
  findOneBy(params: EntityFilterParamsDTO): Promise<Nullable<EntityDTO>>;
}

export interface FindAll<EntityFilterParamsDTO, EntityDTO> {
  findAll(params: EntityFilterParamsDTO, pagination?: Pagination): Promise<EntityDTO[]>;
}

export interface Update<EntityDTO> {
  update(e: EntityDTO): Promise<EntityDTO>;
}

export interface PartialUpdate<EntityDTO> {
  partialUpdate(previous: EntityDTO, next: Partial<EntityDTO>): Promise<EntityDTO>;
}

export interface PartialUpdateByParams<EntityFilterParamsDTO, EntityUpdatesDTO, EntityDTO> {
  partialUpdate(params: EntityFilterParamsDTO, updates: EntityUpdatesDTO): Promise<EntityDTO>;
}

export interface Delete<EntityFilterParamsDTO, EntityDTO> {
  delete(params: EntityFilterParamsDTO): Promise<Nullable<EntityDTO> | void>;
}



