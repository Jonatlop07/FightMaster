import { Nullable } from '@core/abstraction/type';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { FilterWithPagination } from '@core/domain/fighting/dto/filter_params';

export class Pagination {
  @IsNumber() @IsOptional() @IsPositive() limit;
  @IsNumber() @IsOptional() @IsPositive() offset;
}

export interface Create<EntityDetailsDTO, EntityDTO> {
  create(c: EntityDetailsDTO): Promise<EntityDTO>;
}

export interface Exists {
  exists(id: number): Promise<boolean>;
}

export interface FindOne<EntityFilterParamsDTO, EntityDTO> {
  findOneBy(params: EntityFilterParamsDTO): Promise<Nullable<EntityDTO>>;
}

export interface FindAll<EntityFilterParamsDTO extends FilterWithPagination, EntityDTO> {
  findAll(params: EntityFilterParamsDTO): Promise<EntityDTO[]>;
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



