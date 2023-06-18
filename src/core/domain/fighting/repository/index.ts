import { DeleteFighterGateway } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';
import { UpdateFighterGateway } from '@core/domain/fighting/use_case/fighter/update_fighter';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto';
import { CreateEntityGateway } from '@core/domain/fighting/use_case/create_entity';

export default interface FighterRepository
  extends
  CreateEntityGateway<FighterDetailsDTO, FighterDTO>,
  QueryFighterGateway,
  UpdateFighterGateway,
  DeleteFighterGateway {}
