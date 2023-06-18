import { Inject } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import {
  DeleteFighterGateway,
  DeleteFighterInputPort,
  DeleteFighterInteractor, DeleteFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/delete_fighter';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import { FighterDTO } from '@core/domain/fighting/dto';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';

export default class DeleteFighterService implements DeleteFighterInteractor {
  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    @Inject(FightingDITokens.FighterRepository)
    private readonly gateway: DeleteFighterGateway,
  ) {}

  public async execute(input: DeleteFighterInputPort): Promise<DeleteFighterOutputPort> {
    this.logger.debug(`⛔ Executing with params ${input}`, DeleteFighterService.name);
    const fighter: FighterDTO = await this.gateway.findOneBy(input.params);
    CoreAssert.notEmpty(
      fighter,
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: 'Fighter not found.'
      })
    );
    await this.gateway.delete(input.params);
    return { deleted_fighter: fighter };
  }
}
