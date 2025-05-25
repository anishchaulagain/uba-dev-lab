import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User';

export enum RoleType {
  ADMIN = 'admin',
  MENTOR = 'mentor',
  USER = 'user'
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: RoleType,
    unique: true
  })
  name!: RoleType;

  @Column({ nullable: true })
  description!: string;

  @ManyToMany(() => User, user => user.roles)
  users!: User[];
}