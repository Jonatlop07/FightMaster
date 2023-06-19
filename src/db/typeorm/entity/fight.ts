import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DBConfiguration } from '@db/typeorm/config';
import EventDBEntity from '@db/typeorm/entity/event';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { Nullable } from '@core/abstraction/type';

@Entity({ name: 'fight', schema: DBConfiguration.SCHEMA })
export default class FightDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => EventDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  public event: EventDBEntity;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter1Id', referencedColumnName: 'id' })
  public fighter1: FighterDBEntity;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter2Id', referencedColumnName: 'id' })
  public fighter2: FighterDBEntity;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'winnerId', referencedColumnName: 'id' })
  public winner: Nullable<FighterDBEntity>;
}
