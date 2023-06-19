import {
  DeleteEntityGateway,
  DeleteEntityInputPort,
  DeleteEntityInteractor,
  DeleteEntityOutputPort
} from '@core/domain/fighting/use_case/delete_entity';
import { FightFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { FightDTO } from '@core/domain/fighting/dto/dto';

export type DeleteFightInteractor = DeleteEntityInteractor<FightFilterParamsDTO, FightDTO>;
export type DeleteFightInputPort = DeleteEntityInputPort<FightFilterParamsDTO>;
export type DeleteFightOutputPort = DeleteEntityOutputPort<FightDTO>;
export type DeleteFightGateway = DeleteEntityGateway<FightFilterParamsDTO, FightDTO>;
