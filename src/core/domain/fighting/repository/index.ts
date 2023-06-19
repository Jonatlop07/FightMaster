import { DeleteFighterGateway } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';
import { UpdateFighterGateway } from '@core/domain/fighting/use_case/fighter/update_fighter';
import { CreateFighterGateway } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { QueryEventsGateway } from '@core/domain/fighting/use_case/event/query_events';

export default interface FighterRepository
  extends
  CreateFighterGateway,
  QueryFighterGateway,
  UpdateFighterGateway,
  DeleteFighterGateway {}

export interface EventRepository extends QueryEventsGateway {}
