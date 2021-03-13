import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoleInterface } from 'src/roles/role.interfaces';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    name: 'login',
    type: 'varchar',
    length: 155,
    unique: true,
  })
  @ApiProperty()
  login: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 512,
  })
  @ApiProperty()
  password: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 155,
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 155,
    default:
      'https://yt3.ggpht.com/a/AATXAJy3ixQDaFk2kvixHGY_-KrR9dvD0iusTPRVHQ=s900-c-k-c0xffffffff-no-rj-mo',
  })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created: Date;

  // имя пользователя
  @Column({
    name: 'name',
    type: 'varchar',
    length: 155,
  })
  @ApiProperty()
  name: string;

  @Column({
    name: 'surname',
    type: 'varchar',
    length: 155,
  })
  @ApiProperty()
  surname: string;

  @Column({
    name: 'patronymic',
    type: 'varchar',
    length: 155,
  })
  @ApiProperty()
  patronymic: string;

  @Column({
    default: true,
  })
  @ApiProperty()
  active: boolean;

  @Column({
    default: false,
  })
  @ApiProperty()
  proven: boolean;

  @Column({
    type: 'set',
    enum: RoleInterface,
    default: RoleInterface.users,
  })
  @ApiProperty()
  role: RoleInterface[];
}
