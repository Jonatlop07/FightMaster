import { CreateFighterGateway } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { DeleteFighterGateway } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';
import { UpdateFighterGateway } from '@core/domain/fighting/use_case/fighter/update_fighter';

export default interface FighterRepository
  extends
  CreateFighterGateway,
  QueryFighterGateway,
  UpdateFighterGateway,
  DeleteFighterGateway {}
