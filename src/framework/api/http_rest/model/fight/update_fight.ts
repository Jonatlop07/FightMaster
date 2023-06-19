import { IsNumber, IsOptional  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { UpdateFightInputPort, UpdateFightOutputPort } from '@core/domain/fighting/use_case/fight/update_fight';

export class UpdateFightRequestBody {
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

export interface UpdateFightResponse {
  updated_fight: FightDTO;
}

export class UpdateFightMapper {
  public static toInputPort(event_id: number, fight_id: number, request: UpdateFightRequestBody): UpdateFightInputPort {
    return {
      entity_with_updates: {
        event_id,
        id: fight_id,
        fighter1_id: request.fighter1_id,
        fighter2_id: request.fighter2_id,
        winner_id: request.winner_id,
      }
    };
  }

  public static toResponse(output: UpdateFightOutputPort): UpdateFightResponse {
    return {
      updated_fight: output.updated_entity,
    };
  }
}
