import { IsDate, IsString } from 'class-validator';
import { CreateEventEntityPayload } from '@core/domain/fighting/entity/payload';
import { Entity } from '@core/abstraction/entity';

export class Event extends Entity<number> {
  @IsString()
  private readonly name: string;

  @IsString()
  private readonly location: string;

  @IsDate()
  private readonly date: Date;

  constructor(payload: CreateEventEntityPayload) {
    super();
    this.id = payload.id;
    this.name = payload.name;
    this.location = payload.location;
    this.date = payload.date;
  }

  public static async new(payload: CreateEventEntityPayload): Promise<Event> {
    const event: Event = new Event(payload);
    await event.validate();
    return event;
  }

  public getName(): string {
    return this.name;
  }

  public getLocation(): string {
    return this.location;
  }

  public getDate(): Date {
    return this.date;
  }
}
