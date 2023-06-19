import { IsDate, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { UpdateEventInputPort, UpdateEventOutputPort } from '@core/domain/fighting/use_case/event/update_event';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventRequestBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public location: string;

  @IsDate()
  @IsDefined()
  @ApiProperty({type: 'Date'})
  public date: Date;
}

export interface UpdateEventResponse {
  updated_event: EventDTO;
}

export class UpdateEventMapper {
  public static toInputPort(event_id: number, request: UpdateEventRequestBody): UpdateEventInputPort {
    return {
      entity_with_updates: {
        id: event_id,
        name: request.name,
        location: request.location,
        date: request.date
      }
    };
  }

  public static toResponse(output: UpdateEventOutputPort): UpdateEventResponse {
    return {
      updated_event: output.updated_entity,
    };
  }
}
