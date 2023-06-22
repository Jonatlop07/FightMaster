import {
  QueryFighterStatsGateway,
  QueryFighterStatsInputPort,
  QueryFighterStatsInteractor, QueryFighterStatsOutputPort
} from '@core/domain/fighting/use_case/fight/query_fighter_stats';
import { CoreLogger } from '@core/abstraction/logging';
import { FighterStatsDTO } from '@core/domain/fighting/dto/dto';

export class QueryFighterStatsService implements QueryFighterStatsInteractor {
  constructor(
    private readonly gateway: QueryFighterStatsGateway,
    private readonly logger: CoreLogger
  ) {}

  public async execute(
    input: QueryFighterStatsInputPort
  ): Promise<QueryFighterStatsOutputPort> {
    const fighter_stats: FighterStatsDTO = await this.gateway.queryFighterStats({
      id: input.fighter_id
    });
    return {
      fighter_stats
    };
  }
}
