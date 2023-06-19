import { IsDefined, IsInstance, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFighterInputPort, CreateFighterOutputPort } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { FighterDTO } from '@core/domain/fighting/dto/dto';

export class CreateFighterRequestFighterStats {
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

  @IsNumber()
  @ApiProperty({ type: 'number', })
  public tech_knockouts: number;

  @IsNumber()
  @ApiProperty({ type: 'number' })
  public by_decision: number;
}

export class CreateFighterRequestBody {
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
  @IsInstance(CreateFighterRequestFighterStats)
  @ApiProperty({type: 'CreateFighterRequestFighterStats'})
  public stats: CreateFighterRequestFighterStats;
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
        stats: request.stats
      }
    };
  }

  public static toResponse(output: CreateFighterOutputPort): CreateFighterResponse {
    return {
      created_fighter: output.created_entity,
    };
  }
}
