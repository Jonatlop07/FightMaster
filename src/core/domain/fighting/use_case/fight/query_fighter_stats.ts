import { FighterStatsDTO } from '@core/domain/fighting/dto/dto';
import { FighterStatsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { Interactor } from '@core/abstraction/interactor/interactor';

export interface QueryFighterStatsInputPort {
  fighter_id: number;
}

export interface  QueryFighterStatsOutputPort {
  fighter_stats: FighterStatsDTO;
}

export interface QueryFighterStatsGateway {
  queryFighterStats(params: FighterStatsFilterParamsDTO): Promise<FighterStatsDTO>;
}

export interface QueryFighterStatsInteractor
  extends Interactor<QueryFighterStatsInputPort, QueryFighterStatsOutputPort> {}
