import { FightWinMethod } from '@core/domain/fighting/entity/enum';
import { FightDTO, RankingDTO } from '@core/domain/fighting/dto/dto';
import { Interactor } from '@core/abstraction/interactor/interactor';

export interface UpdateFightWithRankingInputPort {
  winner_id: number;
  fight_id: number;
  win_method: FightWinMethod;
}

export interface UpdateFightWithRankingOutputPort {
  updated_fight: FightDTO;
  updated_ranking: Array<RankingDTO>;
}

export interface UpdateFightWithRankingInteractor
  extends Interactor<UpdateFightWithRankingInputPort, UpdateFightWithRankingOutputPort> {}
