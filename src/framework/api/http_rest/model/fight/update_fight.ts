import { IsNumber, IsOptional  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FightDTO, FighterDTO } from '@core/domain/fighting/dto/dto';
import { UpdateFightInputPort, UpdateFightOutputPort } from '@core/domain/fighting/use_case/fight/update_fight';

export class UpdateFightRequestBody {
  @IsNumber()
  @IsOptional()
  @ApiProperty({type: 'number'})
  public winner_id: number;
}

export interface UpdateFightResponse {
  updated_fight: FightDTO;
}

export class UpdateFightMapper {
  public static toInputPort(fight_id: number, winner: FighterDTO): UpdateFightInputPort {
    return {
      update_details: {
        id: fight_id,
        winner
      }
    };
  }

  public static toResponse(output: UpdateFightOutputPort): UpdateFightResponse {
    return {
      updated_fight: output.updated_entity,
    };
  }
}
