import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DBConfiguration } from '@infrastructure/typeorm/config';

@Entity({ name: 'event', schema: DBConfiguration.SCHEMA })
export default class EventDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255, nullable: true })
  public name: string;

  @Column({ length: 255, nullable: true })
  public location: string;

  @Column({ type: 'date', nullable: true })
  public date: Date;
}
