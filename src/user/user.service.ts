import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

export interface FindOneUser {
  id?: number;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (userExist) throw new BadRequestException('El usuario ya existe');
    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }

  async editOne(id: number, dto: UpdateUserDto) {
    const user = await this.getOne(id);
    const editedUser = this.userRepository.merge(user, dto);
    const savedUser = await this.userRepository.save(editedUser);
    delete savedUser.password;
    return savedUser;
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this.userRepository.remove(user);
  }

  async findByUsername(data: FindOneUser) {
    /*
     * Se usa queryBuilder porque la password en la entidad está como select: false
     */
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
