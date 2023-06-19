import { Entity } from '@core/abstraction/entity';
import { IsInt } from 'class-validator';
import { CreateFightEntityPayload } from '@core/domain/fighting/entity/payload';
import { Nullable } from '@core/abstraction/type';
import { Event } from '@core/domain/fighting/entity/event';
import { Fighter } from '@core/domain/fighting/entity/fighter';

export class Fight extends Entity<number> {

  @IsInt()
  private readonly event: Event;

  @IsInt()
  private readonly fighter1: Fighter;

  @IsInt()
  private readonly fighter2: Fighter;

  @IsInt()
  private readonly winner: Nullable<Fighter>;

  constructor(payload: CreateFightEntityPayload) {
    super();
    this.id = payload.id;
    this.event = payload.event;
    this.fighter1 = payload.fighter1;
    this.fighter2 = payload.fighter2;
    this.winner = payload.winner;
  }

  public static async new(payload: CreateFightEntityPayload): Promise<Fight> {
    const fight: Fight = new Fight(payload);
    await fight.validate();
    return fight;
  }

  public getEvent(): Event {
    return this.event;
  }

  public getFighter1(): Fighter {
    return this.fighter1;
  }

  public getFighter2(): Fighter {
    return this.fighter2;
  }

  public getWinnerId(): Fighter {
    return this.winner;
  }
}
