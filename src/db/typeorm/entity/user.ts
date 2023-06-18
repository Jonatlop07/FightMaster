import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DBConfiguration } from '@db/typeorm/config';

@Entity({ name: 'user', schema: DBConfiguration.SCHEMA })
export default class UserDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 125, nullable: false })
  public email: string;

  @Column({ type: 'text', nullable: false })
  public password: string;

  @Column({ name:'accessToken', type: 'text', nullable: true })
  public access_token: string;
}
