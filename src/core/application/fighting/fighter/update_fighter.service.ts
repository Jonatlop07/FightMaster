import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import FightingDITokens from '@core/domain/fighting/di';
import { FighterDTO } from '@core/domain/fighting/dto';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import {
  UpdateFighterGateway,
  UpdateFighterInputPort,
  UpdateFighterInteractor,
  UpdateFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/update_fighter';

export default class UpdateFighterService implements UpdateFighterInteractor {
  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    @Inject(FightingDITokens.FighterRepository)
    private readonly gateway: UpdateFighterGateway,
  ) {}

  public async execute(input: UpdateFighterInputPort): Promise<UpdateFighterOutputPort> {
    this.logger.debug(`📝 Executing with params ${input}`, UpdateFighterService.name);
    CoreAssert.isTrue(
      await this.gateway.exists({ id: input.fighter_with_updates.id }),
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: 'Fighter not found.'
      })
    );
    const updated_fighter: FighterDTO = await this.gateway.update(input.fighter_with_updates);
    return { updated_fighter };
  }
}
