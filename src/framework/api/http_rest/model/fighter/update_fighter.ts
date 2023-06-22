import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { UpdateFighterInputPort, UpdateFighterOutputPort } from '@core/domain/fighting/use_case/fighter/update_fighter';
import { WeightClass } from '@core/domain/fighting/entity/enum';

export class UpdateFighterRequestBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public name: string;

  @IsDefined()
  @IsEnum(WeightClass)
  @ApiProperty({type: 'string'})
  public weight_class: WeightClass;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public nationality: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: 'string'})
  public team: string;
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
        weight_class: request.weight_class as WeightClass,
        nationality: request.nationality,
        team: request.team,
      }
    };
  }

  public static toResponse(output: UpdateFighterOutputPort): UpdateFighterResponse {
    return {
      updated_fighter: output.updated_entity,
    };
  }
}
