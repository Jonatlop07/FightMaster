import { IsDefined, IsInstance, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { UpdateFighterInputPort, UpdateFighterOutputPort } from '@core/domain/fighting/use_case/fighter/update_fighter';

export class UpdateFighterRequestFighterStats {
  @IsNumber()
  @ApiProperty({type: 'number'})
  public wins: number;

  @IsNumber()
  @ApiProperty({type: 'number'})
  public losses: number;

  @IsNumber()
  @ApiProperty({type: 'number'})
  public knockouts: number;

  @IsNumber()
  @ApiProperty({type: 'number'})
  public submissions: number;
}

export class UpdateFighterRequestBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public weight_class: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public nationality: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public team: string;

  @IsDefined()
  @IsInstance(UpdateFighterRequestFighterStats)
  @ApiProperty({type: 'UpdateFighterRequestFighterStats'})
  public stats: UpdateFighterRequestFighterStats;
}

export interface UpdateFighterResponse {
  updated_fighter: FighterDTO;
}

export class UpdateFighterMapper {
  public static toInputPort(fighter_id: number, request: UpdateFighterRequestBody): UpdateFighterInputPort {
    return {
      entity_with_updates: {
        id: fighter_id,
        name: request.name,
        weight_class: request.weight_class,
        nationality: request.nationality,
        team: request.team,
        stats: {
          ...request.stats,
          fighter_id
        }
      }
    };
  }

  public static toResponse(output: UpdateFighterOutputPort): UpdateFighterResponse {
    return {
      updated_fighter: output.updated_entity,
    };
  }
}
