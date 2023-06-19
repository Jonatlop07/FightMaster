import { FightDTO } from '@core/domain/fighting/dto/dto';
import { QueryFightOutputPort } from '@core/domain/fighting/use_case/fight/query_fight';

export interface QueryFightResponse {
  fight: FightDTO;
}
export class QueryFightMapper {
  public static toResponse(output: QueryFightOutputPort): QueryFightResponse {
    return {
      fight: output.entity
    };
  }
}
