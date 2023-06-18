import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import EventDBEntity from '@infrastructure/adapter/typeorm/entity/event';
import FighterDBEntity from '@infrastructure/adapter/typeorm/entity/fighter';
import { DBConfiguration } from '@infrastructure/adapter/typeorm/db.config';

@Entity({ name: 'fight', schema: DBConfiguration.SCHEMA })
export default class FightDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  public event: EventDBEntity;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter1Id' })
  public fighter1: FighterDBEntity;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter2Id' })
  public fighter2: FighterDBEntity;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'winnerId' })
  public winner: FighterDBEntity;
}