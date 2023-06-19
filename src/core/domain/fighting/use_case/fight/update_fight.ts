import {
  UpdateEntityOutputPort
} from '@core/domain/fighting/use_case/update_entity';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { FindOne, PartialUpdate } from '@core/abstraction/persistence';
import { FightFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { UpdateFightDetailsDTO } from '@core/domain/fighting/dto/details';
import { Interactor } from '@core/abstraction/interactor/interactor';

export interface UpdateFightInputPort {
  update_details: UpdateFightDetailsDTO;
}

export interface UpdateFightOutputPort extends UpdateEntityOutputPort<FightDTO> {}

export interface UpdateFightGateway
  extends
  FindOne<FightFilterParamsDTO, FightDTO>,
  PartialUpdate<FightDTO> {}

export interface UpdateFightInteractor extends Interactor<UpdateFightInputPort, UpdateFightOutputPort> {}

