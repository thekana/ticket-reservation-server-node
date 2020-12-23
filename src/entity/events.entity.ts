import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Check, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Event } from '../interfaces/model.interface';
import { UserEntity } from './users.entity';
import { ReservationEntity } from './reservations.entity';

@Entity('events')
export class EventEntity implements Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'ownerID' })
  ownerID: number;

  @Column()
  @IsNotEmpty()
  @Check(`"quota" >= "remainingQuota"`)
  quota: number;

  @Column()
  @IsNotEmpty()
  @Check(`0 <= "remainingQuota"`)
  remainingQuota: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ReservationEntity, reservation => reservation.userID)
  reservations: ReservationEntity[];
}
