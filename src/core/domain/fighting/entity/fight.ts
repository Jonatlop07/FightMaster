import { Entity } from '@core/abstraction/entity';
import { IsInt } from 'class-validator';
import { CreateFightEntityPayload } from '@core/domain/fighting/entity/payload';

export class Fight extends Entity<number> {

  @IsInt()
  private readonly event_id: number;

  @IsInt()
  private readonly fighter1_id: number;

  @IsInt()
  private readonly fighter2_id: number;

  @IsInt()
  private readonly winner_id: number;

  constructor(payload: CreateFightEntityPayload) {
    super();
    this.id = payload.id;
    this.event_id = payload.event_id;
    this.fighter1_id = payload.fighter1_id;
    this.fighter2_id = payload.fighter2_id;
    this.winner_id = payload.winner_id;
  }

  public static async new(payload: CreateFightEntityPayload): Promise<Fight> {
    const fight: Fight = new Fight(payload);
    await fight.validate();
    return fight;
  }

  public getEventId(): number {
    return this.event_id;
  }

  public getFighter1Id(): number {
    return this.fighter1_id;
  }

  public getFighter2Id(): number {
    return this.fighter2_id;
  }

  public getWinnerId(): number {
    return this.winner_id;
  }
}
