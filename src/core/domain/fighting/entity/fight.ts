import { Entity } from '@core/abstraction/entity';
import { IsInt } from 'class-validator';
import { CreateFightEntityPayload } from '@core/domain/fighting/entity/payload';

export class Fight extends Entity<number> {

  @IsInt()
  private readonly eventId: number;

  @IsInt()
  private readonly fighter1Id: number;

  @IsInt()
  private readonly fighter2Id: number;

  @IsInt()
  private readonly winnerId: number;

  constructor(payload: CreateFightEntityPayload) {
    super();
    this.id = payload.id;
    this.eventId = payload.eventId;
    this.fighter1Id = payload.fighter1Id;
    this.fighter2Id = payload.fighter2Id;
    this.winnerId = payload.winnerId;
  }

  public static async new(payload: CreateFightEntityPayload): Promise<Fight> {
    const fight: Fight = new Fight(payload);
    await fight.validate();
    return fight;
  }

  public getEventId(): number {
    return this.eventId;
  }

  public getFighter1Id(): number {
    return this.fighter1Id;
  }

  public getFighter2Id(): number {
    return this.fighter2Id;
  }

  public getWinnerId(): number {
    return this.winnerId;
  }
}
