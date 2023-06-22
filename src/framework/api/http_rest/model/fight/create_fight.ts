import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFightOutputPort } from '@core/domain/fighting/use_case/fight/create_fight';
import { FightDTO } from '@core/domain/fighting/dto/dto';

export class CreateFightRequestBody {
  @IsNumber()
  @ApiProperty({type: 'number'})
  public fighter1_id: number;

  @IsNumber()
  @ApiProperty({type: 'number'})
  public fighter2_id: number;
}

export interface CreateFightResponse {
  created_fight: FightDTO;
}

export class CreateFightMapper {
  public static toResponse(output: CreateFightOutputPort): CreateFightResponse {
    return {
      created_fight: output.created_fight,
    };
  }
}
