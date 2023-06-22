import {
  UpdateRankingGateway,
  UpdateRankingInputPort,
  UpdateRankingInteractor, UpdateRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/update_ranking';
import { CoreLogger } from '@core/abstraction/logging';
import { CoreFighterStatsMapper } from '@core/domain/fighting/mapper';
import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';
import { RankingDTO, RankingWithScoreDTO } from '@core/domain/fighting/dto/dto';

export class UpdateRankingService implements UpdateRankingInteractor {
  constructor(
    private readonly gateway: UpdateRankingGateway,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: UpdateRankingInputPort): Promise<UpdateRankingOutputPort> {
    const fighters_ranking_with_score: Array<RankingWithScoreDTO> = await Promise.all(
      input.fighters_ranking_with_stats.map(
        async ({ ranking, stats }) => {
          const fighter_stats: FighterStats = await CoreFighterStatsMapper.fromDTO(stats);
          return {
            ranking: ranking,
            score: fighter_stats.computeRankingScore()
          };
        }
      )
    );
    const fighters_ranking_by_score_descending = fighters_ranking_with_score.sort(
      (a, b) =>
        b.score - a.score
    ).map(
      ({ ranking }) => ranking
    );
    const updated_ranking: Array<RankingDTO> = await Promise.all(
      fighters_ranking_by_score_descending.map(
        async (fighter_ranking, index) =>
          await this.gateway.update({
            ...fighter_ranking,
            rank: index + 1
          })
      )
    );
    return {
      updated_ranking
    };
  }
}
