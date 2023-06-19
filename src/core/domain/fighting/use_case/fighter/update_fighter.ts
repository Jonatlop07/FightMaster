import {
  UpdateEntityGateway,
  UpdateEntityInputPort,
  UpdateEntityInteractor,
  UpdateEntityOutputPort
} from '@core/domain/fighting/use_case/update_entity';
import { FighterDTO } from '@core/domain/fighting/dto/dto';

export type UpdateFighterInteractor = UpdateEntityInteractor<FighterDTO>;
export type UpdateFighterInputPort = UpdateEntityInputPort<FighterDTO>;
export type UpdateFighterOutputPort = UpdateEntityOutputPort<FighterDTO>;
export type UpdateFighterGateway = UpdateEntityGateway<FighterDTO>;

