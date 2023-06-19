import { Inject } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';
import {
  QueryFighterGateway,
  QueryFighterInputPort,
  QueryFighterInteractor, QueryFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/query_fighter';

export default class QueryFighterService implements QueryFighterInteractor {
  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    @Inject(FightingDITokens.FighterRepository)
    private readonly gateway: QueryFighterGateway,
  ) {}

  public async execute(input: QueryFighterInputPort): Promise<QueryFighterOutputPort> {
    this.logger.debug(`🔎 Executing with params ${input}`, QueryFighterService.name);
    const fighter: FighterDTO = await this.gateway.findOneBy(input.params);
    CoreAssert.notEmpty(
      fighter,
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: 'Fighter not found.'
      })
    );
    return { fighter };
  }
}
