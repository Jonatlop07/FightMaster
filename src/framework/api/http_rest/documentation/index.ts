import { EntityName } from '@core/domain/fighting/entity/entity_name';

export function createdEntityApiResponseMessage(entity_name: EntityName) {
  return `${entity_name} successfully created`;
}

export function invalidEntityFieldsResponseMessage(entity_name: EntityName) {
  return `${entity_name} data has invalid format`;
}
