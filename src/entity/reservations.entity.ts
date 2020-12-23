import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Check, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Reservation } from '../interfaces/model.interface';
import { UserEntity } from './users.entity';
import { EventEntity } from './events.entity';

@Entity('reservations')
export class ReservationEntity implements Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'userID' })
  userID: number;

  @ManyToOne(() => EventEntity, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'eventID' })
  eventID: number;

  @Column()
  @IsNotEmpty()
  @Check(`"quota" >= 1`)
  quota: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
