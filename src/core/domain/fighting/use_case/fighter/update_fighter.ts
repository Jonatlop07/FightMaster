import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { FighterDTO } from '@core/domain/fighting/dto';
import { Exists, Update } from '@core/abstraction/persistence';
import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

interface UpdateFighterInputPort extends InputPort {
  fighter_with_updates: FighterDTO;
}

interface UpdateFighterOutputPort extends OutputPort {
  updated_fighter: FighterDTO;
}

interface UpdateFighterInteractor
  extends Interactor<UpdateFighterInputPort, UpdateFighterOutputPort> {}

interface UpdateFighterGateway extends Exists<FighterFilterParamsDTO>, Update<FighterDTO> {}

export {
  UpdateFighterInputPort,
  UpdateFighterOutputPort,
  UpdateFighterInteractor,
  UpdateFighterGateway,
};
