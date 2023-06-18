import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto';
import { Create } from '@core/abstraction/persistence';

interface CreateFighterInputPort extends InputPort {
  fighter_details: FighterDetailsDTO;
}

interface CreateFighterOutputPort extends OutputPort {
  created_fighter: FighterDTO;
}

interface CreateFighterInteractor
  extends Interactor<CreateFighterInputPort, CreateFighterOutputPort> {}

interface CreateFighterGateway extends Create<FighterDetailsDTO, FighterDTO> {}

export {
  CreateFighterInputPort,
  CreateFighterOutputPort,
  CreateFighterInteractor,
  CreateFighterGateway,
};
