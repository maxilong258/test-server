import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menus } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(@InjectRepository(Menus) private menusRepository: Repository<Menus>) {}
  create(createMenuDto: CreateMenuDto) {
    const menu = this.menusRepository.create(createMenuDto)
    return this.menusRepository.save(menu)
  }

  findAll() {
    return this.menusRepository.find()
  }

  findOne(id: number) {
    return this.menusRepository.findOne({where: {id}})
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id)
    const newMenu = this.menusRepository.merge(menu, updateMenuDto)
    return this.menusRepository.save(newMenu)
  }

  remove(id: number) {
    return this.menusRepository.delete(id)
  }
}
