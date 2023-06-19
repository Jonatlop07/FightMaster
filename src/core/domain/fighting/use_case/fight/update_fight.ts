import {
  UpdateEntityGateway,
  UpdateEntityInputPort,
  UpdateEntityInteractor,
  UpdateEntityOutputPort
} from '@core/domain/fighting/use_case/update_entity';
import { FightDTO } from '@core/domain/fighting/dto/dto';

export type UpdateFightInteractor = UpdateEntityInteractor<FightDTO>;
export type UpdateFightInputPort = UpdateEntityInputPort<FightDTO>;
export type UpdateFightOutputPort = UpdateEntityOutputPort<FightDTO>;
export type UpdateFightGateway = UpdateEntityGateway<FightDTO>;

