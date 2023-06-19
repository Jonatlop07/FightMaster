import { IsNumber, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFightInputPort, CreateFightOutputPort } from '@core/domain/fighting/use_case/fight/create_fight';
import { FightDTO } from '@core/domain/fighting/dto/dto';

export class CreateFightRequestBody {
  @IsNumber()
  @ApiProperty({type: 'number'})
  public fighter1_id: number;

  @IsNumber()
  @ApiProperty({type: 'number'})
  public fighter2_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({type: 'number'})
  public winner_id: number;
}

export interface CreateFightResponse {
  created_fight: FightDTO;
}

export class CreateFightMapper {
  public static toInputPort(
    event_id: number,
    request: CreateFightRequestBody
  ): CreateFightInputPort {
    return {
      entity_details: {
        event_id,
        fighter1_id: request.fighter1_id,
        fighter2_id: request.fighter2_id,
        winner_id: request.winner_id,
      }
    };
  }

  public static toResponse(output: CreateFightOutputPort): CreateFightResponse {
    return {
      created_fight: output.created_entity,
    };
  }
}
