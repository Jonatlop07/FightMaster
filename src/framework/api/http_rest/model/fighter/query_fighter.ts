import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { QueryFighterOutputPort } from '@core/domain/fighting/use_case/fighter/query_fighter';

export interface QueryFighterResponse {
  fighter: FighterDTO;
}
export class QueryFighterMapper {
  public static toResponse(output: QueryFighterOutputPort): QueryFighterResponse {
    return {
      fighter: output.entity
    };
  }
}
