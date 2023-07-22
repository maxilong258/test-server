import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne
} from 'typeorm'
import { Logs } from '../logs/logs.entity'
import { Roles } from '../roles/roles.entity'
import { Profile } from './profile.entity'
import { AfterInsert } from 'typeorm/decorator/listeners/AfterInsert'
import { AfterRemove } from 'typeorm/decorator/listeners/AfterRemove'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  // @Exclude()
  password: string

  // typescript -> 数据库 关联关系 Mapping
  @OneToMany(() => Logs, (logs) => logs.user, { cascade: true })
  logs: Logs[]

  @ManyToMany(() => Roles, (roles) => roles.users, { cascade: ['insert'] })
  @JoinTable({ name: 'users_roles' })
  roles: Roles[]

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile

  @AfterInsert()
  afterInster() {
    console.log('afterInster', this.id, this.username)
  }

  @AfterRemove()
  afterRemove() {
    console.log('afterRemove')
  }
}
