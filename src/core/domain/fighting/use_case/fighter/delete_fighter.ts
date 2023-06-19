import {
  DeleteEntityGateway,
  DeleteEntityInputPort,
  DeleteEntityInteractor,
  DeleteEntityOutputPort
} from '@core/domain/fighting/use_case/delete_entity';
import { FighterFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';
import { FighterDTO } from '@core/domain/fighting/dto/dto';

export type DeleteFighterInteractor = DeleteEntityInteractor<FighterFilterParamsDTO, FighterDTO>;
export type DeleteFighterInputPort = DeleteEntityInputPort<FighterFilterParamsDTO>;
export type DeleteFighterOutputPort = DeleteEntityOutputPort<FighterDTO>;
export type DeleteFighterGateway = DeleteEntityGateway<FighterFilterParamsDTO, FighterDTO>;
