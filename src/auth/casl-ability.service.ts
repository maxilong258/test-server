import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { Logs } from 'src/logs/logs.entity'
import { UserService } from 'src/user/user.service'
import { getEntities } from 'src/utils/common'

@Injectable()
export class CaslAbilityService {
  constructor(private userService: UserService) {}
  async forRoot(username: string) {

    const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

    const user = await this.userService.find(username)
    user.roles.forEach(role => {
      role.menus.forEach(menu => {
        const actions = menu.acl.split(',')
        actions.forEach(action => can(action, getEntities(menu.path)))
      })
    })

    // can('read', Logs)
    // cannot('update', Logs)

    const ability = build({
      detectSubjectType: (object) => object.constructor as any
    })

    return ability
  }
}
