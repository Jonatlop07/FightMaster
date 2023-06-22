import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFighterInputPort, CreateFighterOutputPort } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { WeightClass } from '@core/domain/fighting/entity/enum';

export class CreateFighterRequestBody {
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

export interface CreateFighterResponse {
  created_fighter: FighterDTO;
}

export class CreateFighterMapper {
  public static toInputPort(request: CreateFighterRequestBody): CreateFighterInputPort {
    return {
      entity_details: {
        name: request.name,
        weight_class: request.weight_class,
        nationality: request.nationality,
        team: request.team,
      }
    };
  }

  public static toResponse(output: CreateFighterOutputPort): CreateFighterResponse {
    return {
      created_fighter: output.created_entity,
    };
  }
}
