import { RankingRepository } from '@core/domain/fighting/repository';
import { RankingFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { RankingDTO } from '@core/domain/fighting/dto/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RankingDBEntity from '@db/typeorm/entity/ranking';
import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import { RankingMapper } from '@db/typeorm/mapper/ranking.mapper';
import { RankingDetailsDTO } from '@core/domain/fighting/dto/details';

const entity_alias = 'ranking';
const entity_fields = {
  fighter: 'fighter',
  weight_class: 'weightClass',
};
const weight_class_field = 'weight_class';

export class RankingTypeOrmRepositoryAdapter implements RankingRepository {
  constructor(
    @InjectRepository(RankingDBEntity)
    private readonly repository: Repository<RankingDBEntity>,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger
  ) {}

  public async findAll(params: RankingFilterParamsDTO): Promise<RankingDTO[]> {
    const weight_class = params.weight_class.toString();
    const query_builder = this.repository.createQueryBuilder(entity_alias)
      .leftJoinAndSelect(`${entity_alias}.${entity_fields.fighter}`, entity_fields.fighter)
      .where(
        `${entity_alias}.${entity_fields.weight_class} = :${weight_class_field}`,
        { weight_class }
      );
    const ranking_entities = await query_builder.getMany();
    return ranking_entities.map(RankingMapper.fromDBEntity);
  }

  public async update(dto: RankingDTO): Promise<RankingDTO> {
    const updated_ranking = await this.repository.save(RankingMapper.fromDTO(dto));
    return RankingMapper.fromDBEntity(updated_ranking);
  }

  public async create(details_dto: RankingDetailsDTO): Promise<RankingDTO> {
    const created_ranking = await this.repository.save(RankingMapper.fromDetailsDTO(details_dto));
    return RankingMapper.fromDBEntity(created_ranking);
  }
}
