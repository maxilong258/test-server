import { Roles } from "../../roles/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Menus {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  path: string

  @Column()
  order: number

  @Column()
  acl: string

  @ManyToMany(() => Roles, (roles) => roles.menus)
  @JoinTable({name: 'role_menus'})
  role: Roles
}
