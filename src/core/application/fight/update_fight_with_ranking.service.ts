import { CoreLogger } from '@core/abstraction/logging';
import { FightFacade } from '@core/domain/fighting/facade/fight.facade';
import { FighterExternalFacade } from '@core/application/fighter/fighter.facade_impl';
import { RankingFacade } from '@core/domain/fighting/facade/ranking.facade';
import {
  UpdateFightWithRankingInputPort,
  UpdateFightWithRankingInteractor, UpdateFightWithRankingOutputPort
} from '@core/domain/fighting/use_case/fight/update_fight_with_ranking';
import { toPrettyJsonString } from '@core/abstraction/format';

export class UpdateFightWithRankingService implements UpdateFightWithRankingInteractor {
  constructor(
    private readonly fight_facade: FightFacade,
    private readonly fighter_facade: FighterExternalFacade,
    private readonly ranking_facade: RankingFacade,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: UpdateFightWithRankingInputPort): Promise<UpdateFightWithRankingOutputPort> {
    const { entity: winner } = await this.fighter_facade.queryFighter({
      filter_params: { id: input.winner_id }
    });
    const { updated_entity: updated_fight } = await this.fight_facade.updateFight(
      {
        update_details: {
          id: input.fight_id,
          winner,
          win_method: input.win_method
        }
      }
    );
    const { entities: ranking } = await this.ranking_facade.queryWeightClassRanking({
      filter_params: {
        weight_class: winner.weight_class
      }
    });
    this.logger.log(
      `Query fighter stats with: ${toPrettyJsonString(ranking)}`,
      UpdateFightWithRankingService.name
    );
    const fighters_ranking_with_stats = await Promise.all(
      ranking.map(
        async (fighter_ranking) => {
          const { fighter_stats } = await this.fighter_facade.queryFighterStats({
            fighter_id: fighter_ranking.fighter.id
          });
          return { ranking: fighter_ranking, stats: fighter_stats };
        }
      )
    );
    this.logger.log(
      `Query fighter stats output: ${toPrettyJsonString(fighters_ranking_with_stats)}`,
      UpdateFightWithRankingService.name
    );
    const { updated_ranking } = await this.ranking_facade.updateRanking({
      fighters_ranking_with_stats
    });
    this.logger.log(
      `Update ranking output: ${toPrettyJsonString(updated_ranking)}`,
      UpdateFightWithRankingService.name
    );
    return {
      updated_fight,
      updated_ranking,
    };
  }
}
