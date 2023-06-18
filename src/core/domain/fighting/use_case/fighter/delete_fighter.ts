import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { FighterDTO } from '@core/domain/fighting/dto';
import { Delete, FindOne } from '@core/abstraction/persistence';
import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

interface DeleteFighterInputPort extends InputPort {
  params: FighterFilterParamsDTO;
}

interface DeleteFighterOutputPort extends OutputPort {
  deleted_fighter: FighterDTO;
}

interface DeleteFighterInteractor
  extends Interactor<DeleteFighterInputPort, DeleteFighterOutputPort> {}

interface DeleteFighterGateway extends
  FindOne<FighterFilterParamsDTO, FighterDTO>,
  Delete<FighterFilterParamsDTO, FighterDTO> {}

export {
  DeleteFighterInputPort,
  DeleteFighterOutputPort,
  DeleteFighterInteractor,
  DeleteFighterGateway,
};
