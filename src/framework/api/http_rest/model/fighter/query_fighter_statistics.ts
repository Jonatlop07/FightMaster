import { FighterStatsDTO } from '@core/domain/fighting/dto/dto';
import { QueryFighterStatsOutputPort } from '@core/domain/fighting/use_case/fight/query_fighter_stats';

export interface QueryFighterStatsResponse {
  fighter_stats: FighterStatsDTO
}

export class QueryFighterStatsMapper {
  public static toResponse(output: QueryFighterStatsOutputPort): QueryFighterStatsResponse {
    return {
      fighter_stats: output.fighter_stats
    };
  }
}
