import { IsDefined,  IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEventInputPort, CreateEventOutputPort } from '@core/domain/fighting/use_case/event/create_event';
import { EventDTO } from '@core/domain/fighting/dto/dto';

export class CreateEventRequestBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public location: string;

  @IsString()
  @IsDefined()
  @ApiProperty({type: 'Date'})
  public date: Date;
}

export interface CreateEventResponse {
  created_event: EventDTO;
}

export class CreateEventMapper {
  public static toInputPort(request: CreateEventRequestBody): CreateEventInputPort {
    return {
      entity_details: {
        name: request.name,
        location: request.location,
        date: request.date,
      }
    };
  }

  public static toResponse(output: CreateEventOutputPort): CreateEventResponse {
    return {
      created_event: output.created_entity,
    };
  }
}
