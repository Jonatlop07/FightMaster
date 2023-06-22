import { Entity } from '@core/abstraction/entity';
import { IsDefined, IsEnum, IsInstance, IsOptional } from 'class-validator';
import { CreateFightEntityPayload } from '@core/domain/fighting/entity/payload';
import { Nullable } from '@core/abstraction/type';
import { Event } from '@core/domain/fighting/entity/event';
import { Fighter } from '@core/domain/fighting/entity/fighter';
import { FightWinMethod } from '@core/domain/fighting/entity/enum';

export class Fight extends Entity<number> {
  @IsDefined()
  @IsInstance(Event)
  private readonly event: Event;

  @IsDefined()
  @IsInstance(Fighter)
  private readonly fighter1: Fighter;

  @IsDefined()
  @IsInstance(Fighter)
  private readonly fighter2: Fighter;

  @IsOptional()
  @IsInstance(Fighter)
  private readonly winner: Nullable<Fighter>;

  @IsOptional()
  @IsEnum(FightWinMethod)
  private readonly win_method: Nullable<FightWinMethod>;

  constructor(payload: CreateFightEntityPayload) {
    super();
    this.id = payload.id;
    this.event = payload.event;
    this.fighter1 = payload.fighter1;
    this.fighter2 = payload.fighter2;
    this.winner = payload.winner;
    this.win_method = payload.win_method;
  }

  public static async new(payload: CreateFightEntityPayload): Promise<Fight> {
    const fight: Fight = new Fight(payload);
    await fight.validate();
    return fight;
  }

  public hasDifferentFighters(): boolean {
    return this.fighter1.getId() !== this.fighter2.getId();
  }

  public hasValidWinMethod(): boolean {
    return !!this.win_method &&
      Object
        .values(FightWinMethod)
        .includes(this.win_method as FightWinMethod);
  }

  public hasValidWinner(): boolean {
    return !!this.winner
      && (
        this.winner.getId() === this.fighter1.getId()
        || this.winner.getId() === this.fighter2.getId()
      );
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

  public getWinner(): Fighter {
    return this.winner;
  }

  public getWinMethod(): FightWinMethod {
    return this.win_method;
  }
}
