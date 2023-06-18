import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { Inject, Logger } from '@nestjs/common';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details.dto';
import { FighterDTO } from '@core/domain/fighting/dto';
import { Create } from '@core/abstraction/persistence';
import FightingDITokens from '@core/domain/fighting/di';

interface CreateFighterInputPort extends InputPort {
  fighter_details: FighterDetailsDTO;
}

interface CreateFighterOutputPort extends OutputPort {
  created_fighter: FighterDTO;
}

interface CreateFighterInteractor
  extends Interactor<CreateFighterInputPort, CreateFighterOutputPort> {}

interface CreateFighterGateway extends Create<FighterDetailsDTO, FighterDTO> {}

class CreateFighterService implements CreateFighterInteractor {
  private readonly logger: Logger = new Logger(CreateFighterService.name);

  constructor(
    @Inject(FightingDITokens.FighterRepository)
    private readonly gateway: CreateFighterGateway,
  ) {}

  public async execute(input: CreateFighterInputPort): Promise<CreateFighterOutputPort> {
    const created_fighter_dto = await this.gateway.create(input.fighter_details);
    return { created_fighter: created_fighter_dto };
  }
}

export {
  CreateFighterInputPort,
  CreateFighterOutputPort,
  CreateFighterInteractor,
  CreateFighterGateway,
  CreateFighterService
};
