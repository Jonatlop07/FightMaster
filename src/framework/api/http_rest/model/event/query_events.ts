import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@core/abstraction/type';
import { QueryEventsInputPort, QueryEventsOutputPort } from '@core/domain/fighting/use_case/event/query_events';
import { EventDTO, FightDTO } from '@core/domain/fighting/dto/dto';
import { EventsFilterParamsDTO } from '@core/domain/fighting/dto/filter_params';

export class QueryEventsRequestQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public name: Optional<string>;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public location: Optional<string>;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  public date: Optional<Date>;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  public limit: Optional<number>;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  public offset: Optional<number>;
}

export interface QueryEventsResponsePayload {
  id: number,
  name: string,
  location: string,
  date: Date,
  fights: Array<FightDTO>
}

export interface QueryEventsResponse {
  events: Array<QueryEventsResponsePayload>
}

export class QueryEventsMapper {
  public static toInputPort(request: QueryEventsRequestQuery): QueryEventsInputPort {
    const filter_params: EventsFilterParamsDTO = {
      name: request.name,
      date: request.date,
      location: request.location,
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
}
