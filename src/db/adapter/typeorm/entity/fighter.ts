import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DBConfiguration } from '@infrastructure/adapter/typeorm/db.config';

@Entity({ name: 'fighter', schema: DBConfiguration.SCHEMA })
export default class FighterDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255, nullable: false })
  public name: string;

  @Column({ name: 'weightClass', length: 255, nullable: false })
  public weightClass: string;

  @Column({ length: 255, nullable: false })
  public nationality: string;

  @Column({ length: 255, nullable: false })
  public team: string;
}
