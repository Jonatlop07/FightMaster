import { EntityName } from '@core/domain/fighting/entity/entity_name';

export function createdEntityApiResponseMessage(entity_name: EntityName) {
  return `${entity_name} successfully created`;
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

export function invalidEntityFieldsResponseMessage(entity_name: EntityName) {
  return `${entity_name} data has invalid format`;
}
