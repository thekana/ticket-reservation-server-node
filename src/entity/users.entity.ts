import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User, UserRole } from '../interfaces/model.interface';
import { EventEntity } from './events.entity';
import { ReservationEntity } from './reservations.entity';

@Entity('users')
@Unique(['username'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  username: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @IsNotEmpty()
  role: UserRole;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventEntity, event => event.ownerID)
  events: EventEntity[];

  @OneToMany(() => ReservationEntity, reservation => reservation.userID)
  reservations: ReservationEntity[];
}
