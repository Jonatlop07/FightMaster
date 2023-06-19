import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { FindOne } from '@core/abstraction/persistence';
import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

interface QueryFighterInputPort extends InputPort {
  params: FighterFilterParamsDTO;
}

interface QueryFighterOutputPort extends OutputPort {
  fighter: FighterDTO;
}

interface QueryFighterInteractor
  extends Interactor<QueryFighterInputPort, QueryFighterOutputPort> {}

interface QueryFighterGateway extends
  FindOne<FighterFilterParamsDTO, FighterDTO> {}

export {
  QueryFighterInputPort,
  QueryFighterOutputPort,
  QueryFighterInteractor,
  QueryFighterGateway,
};
