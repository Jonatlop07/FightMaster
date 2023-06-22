import {
  CreateFighterRankingGateway,
  CreateFighterRankingInputPort,
  CreateFighterRankingInteractor, CreateFighterRankingOutputPort
} from '@core/domain/fighting/use_case/ranking/create_fighter_ranking.service';
import { CoreLogger } from '@core/abstraction/logging';
import { RankingDTO } from '@core/domain/fighting/dto/dto';
import { toPrettyJsonString } from '@core/abstraction/format';

export class CreateFighterRankingService implements CreateFighterRankingInteractor {
  constructor(
    private readonly gateway: CreateFighterRankingGateway,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: CreateFighterRankingInputPort): Promise<CreateFighterRankingOutputPort> {
    this.logger.log(
      `➕ Ranking to create: ${toPrettyJsonString(input)}`,
      CreateFighterRankingService.name
    );
    const { weight_class } = input.ranking_details;
    const weight_class_ranking: Array<RankingDTO> = await this.gateway.findAll({
      weight_class
    });
    const sorted_weight_class_ranking: Array<RankingDTO> = weight_class_ranking
      .sort((a, b) => b.rank - a.rank);
    const new_ranking_rank = sorted_weight_class_ranking.length + 1;
    const created_ranking = await this.gateway.create({
      ...input.ranking_details,
      rank: new_ranking_rank
    });
    this.logger.log(
      `➕ Created Ranking: ${toPrettyJsonString(created_ranking)}`,
      CreateFighterRankingService.name
    );
    return {
      created_ranking
    };
  }
}
