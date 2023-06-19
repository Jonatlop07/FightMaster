import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { DeleteFighterOutputPort } from '@core/domain/fighting/use_case/fighter/delete_fighter';

export interface DeleteFighterResponse {
  deleted_fighter: FighterDTO;
}
export class DeleteFighterMapper {
  public static toResponse(output: DeleteFighterOutputPort): DeleteFighterResponse {
    return {
      deleted_fighter: output.deleted_entity
    };
  }
}
