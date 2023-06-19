import { EventDTO } from '@core/domain/fighting/dto/dto';
import { QueryEventOutputPort } from '@core/domain/fighting/use_case/event/query_event';

export interface QueryEventResponse {
  event: EventDTO;
}
export class QueryEventMapper {
  public static toResponse(output: QueryEventOutputPort): QueryEventResponse {
    return {
      event: output.entity
    };
  }
}
