import { EntityName } from '@core/domain/fighting/entity/enum';

export function createdEntityApiResponseMessage(entity_name: EntityName) {
  return `${entity_name} successfully created`;
}

export function queriedEntitiesApiResponseMessage(entity_name: EntityName) {
  return `${entity_name}s successfully retrieved`;
}

export function queriedEntityApiResponseMessage(entity_name: EntityName) {
  return `${entity_name} successfully retrieved`;
}

export function updatedEntityApiResponseMessage(entity_name: EntityName) {
  return `${entity_name} successfully updated`;
}

export function deletedEntityApiResponseMessage(entity_name: EntityName) {
  return `${entity_name} successfully deleted`;
}

export function notFoundEntityResponseMessage(entity_name: EntityName) {
  return `${entity_name} could not be found`;
}

export function invalidEntityFieldsResponseMessage(entity_name: EntityName) {
  return `${entity_name} data has invalid format`;
}

export function queriedDataApiResponseMessage(data_alias: string) {
  return `${data_alias} successfully retrieved`;
}

export function notFoundDataResponseMessage(data_alias: string) {
  return `${data_alias} could not be found`;
}
