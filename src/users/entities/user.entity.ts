import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../types/UserRole';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: 'pseudonyme' })
  nickname: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: '' })
  comment: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
