import { FightDTO } from '@core/domain/fighting/dto/dto';
import { FightDetailsDTO } from '@core/domain/fighting/dto/details';
import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { Create } from '@core/abstraction/persistence';

interface CreateFightInputPort extends InputPort {
  fight_details: FightDetailsDTO;
}

interface CreateFightOutputPort extends OutputPort {
  created_fight: FightDTO;
}

interface CreateFightGateway extends Create<FightDetailsDTO, FightDTO> {}

interface CreateFightInteractor
  extends Interactor<CreateFightInputPort, CreateFightOutputPort> {}

export {
  CreateFightInputPort,
  CreateFightOutputPort,
  CreateFightGateway,
  CreateFightInteractor
};
