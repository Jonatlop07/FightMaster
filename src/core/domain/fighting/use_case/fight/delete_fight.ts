import { FightFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { Delete, FindOne } from '@core/abstraction/persistence';

interface DeleteFightInputPort extends InputPort {
  fight_params: FightFilterParamsDTO;
}

interface DeleteFightOutputPort extends OutputPort {
  deleted_fight: FightDTO;
}

interface DeleteFightGateway extends
  Delete<FightFilterParamsDTO, FightDTO>,
  FindOne<FightFilterParamsDTO, FightDTO> {}

interface DeleteFightInteractor extends Interactor<DeleteFightInputPort, DeleteFightOutputPort> {}

export {
  DeleteFightInputPort,
  DeleteFightOutputPort,
  DeleteFightGateway,
  DeleteFightInteractor
};
