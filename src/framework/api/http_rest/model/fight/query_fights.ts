import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@core/abstraction/type';
import { QueryFightsInputPort, QueryFightsOutputPort } from '@core/domain/fighting/use_case/fight/query_fights';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { FightsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export class QueryFightsRequestQuery {
  @IsNumber()
  @IsOptional()
  @ApiProperty({type: 'number'})
  public fighter_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({type: 'number'})
  public winner_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({type: 'number'})
  public event_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  public limit: Optional<number>;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  public offset: Optional<number>;
}

export interface QueryFightsResponse {
  fights: Array<FightDTO>;
}

export class QueryFightsMapper {
  public static toInputPort(request: QueryFightsRequestQuery): QueryFightsInputPort {
    const filter_params: FightsFilterParamsDTO = {
      fighter_id: request.fighter_id,
      winner_id: request.winner_id,
      event_id: request.event_id
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

  public static toResponse(output: QueryFightsOutputPort): QueryFightsResponse {
    return {
      fights: output.entities
    };
  }
}
