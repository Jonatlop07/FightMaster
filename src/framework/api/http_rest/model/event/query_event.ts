import { EventDTO, FightDTO } from '@core/domain/fighting/dto/dto';
import { QueryEventOutputPort } from '@core/domain/fighting/use_case/event/query_event';
import { QueryFightsOutputPort } from '@core/domain/fighting/use_case/fight/query_fights';

export interface QueryEventResponse {
  event: EventDTO;
  fights: Array<FightDTO>;
}
export class QueryEventMapper {
  public static toResponse(
    query_event_output: QueryEventOutputPort,
    query_event_fights_output: QueryFightsOutputPort
  ): QueryEventResponse {
    return {
      event: query_event_output.entity,
      fights: query_event_fights_output.entities
    };
  }
}
