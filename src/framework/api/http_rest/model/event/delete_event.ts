import { EventDTO } from '@core/domain/fighting/dto/dto';
import { DeleteEventOutputPort } from '@core/domain/fighting/use_case/event/delete_event';

export interface DeleteEventResponse {
  deleted_event: EventDTO;
}
export class DeleteEventMapper {
  public static toResponse(output: DeleteEventOutputPort): DeleteEventResponse {
    return {
      deleted_event: output.deleted_entity
    };
  }
}
