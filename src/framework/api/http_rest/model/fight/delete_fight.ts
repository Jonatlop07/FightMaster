import { FightDTO } from '@core/domain/fighting/dto/dto';
import { DeleteFightOutputPort } from '@core/domain/fighting/use_case/fight/delete_fight';

export interface DeleteFightResponse {
  deleted_fight: FightDTO;
}
export class DeleteFightMapper {
  public static toResponse(output: DeleteFightOutputPort): DeleteFightResponse {
    return {
      deleted_fight: output.deleted_entity
    };
  }
}
