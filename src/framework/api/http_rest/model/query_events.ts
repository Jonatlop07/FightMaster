import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@core/abstraction/type';

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
}
