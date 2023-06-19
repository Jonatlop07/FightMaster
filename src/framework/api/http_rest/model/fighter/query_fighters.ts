import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@core/abstraction/type';
import { QueryFightersInputPort, QueryFightersOutputPort } from '@core/domain/fighting/use_case/fighter/query_fighters';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { FightersFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export class QueryFightersRequestQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public name: Optional<string>;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public team: Optional<string>;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public weight_class: Optional<string>;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public nationality: Optional<string>;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  public limit: Optional<number>;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  public offset: Optional<number>;
}

export interface QueryFightersResponse {
  fighters: Array<FighterDTO>;
}

export class QueryFightersMapper {
  public static toInputPort(request: QueryFightersRequestQuery): QueryFightersInputPort {
    const filter_params: FightersFilterParamsDTO = {
      name: request.name,
      weight_class: request.weight_class,
      nationality: request.nationality,
      team: request.team,
    };
    if (!!request.limit || !!request.offset) {
      filter_params.pagination = {
        limit: request.limit,
        offset: request.offset,
      };
    }
    return {
      filter_params
    };
  }

  public static toResponse(output: QueryFightersOutputPort): QueryFightersResponse {
    return {
      fighters: output.entities
    };
  }
}
