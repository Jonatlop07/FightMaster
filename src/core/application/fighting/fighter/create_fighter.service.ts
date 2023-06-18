import { Inject } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import {
  CreateFighterGateway,
  CreateFighterInputPort,
  CreateFighterInteractor, CreateFighterOutputPort
} from '@core/domain/fighting/use_case/fighter/create_fighter';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';

export default class CreateFighterService implements CreateFighterInteractor {
  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    @Inject(FightingDITokens.FighterRepository)
    private readonly gateway: CreateFighterGateway,
  ) {}

  public async execute(input: CreateFighterInputPort): Promise<CreateFighterOutputPort> {
    this.logger.debug(`➕ Executing with params ${input}`, CreateFighterService.name);
    const created_fighter_dto = await this.gateway.create(input.fighter_details);
    return { created_fighter: created_fighter_dto };
  }
}
