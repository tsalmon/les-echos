import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from "typeorm";
import { User } from './entities/user.entity';
import { HashingService } from './hashing/hashing.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, nickname ,name, comment, address, role } = paginationQuery;

    return this.userRepository.find({
      where: {
        nickname: nickname,
        name: name,
        comment: comment,
        address: address,
        role: role,
      },
      take: limit,
      skip: offset || 0,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      ...updateUserDto,
      id: id,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    if (updateUserDto.password) {
      user.password = await this.hashingService.hash(updateUserDto.password);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.remove(user);
  }
}
