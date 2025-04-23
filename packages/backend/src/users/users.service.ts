import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CASDOOR_PROVIDER } from 'src/casdoor/casdoor.provider';
import { SDK as CasdoorSDK } from 'casdoor-nodejs-sdk';
import { PaginationDTO } from 'src/pagination/pagination.dto';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@Inject(CASDOOR_PROVIDER) private readonly casdoor: CasdoorSDK) {}

  async findAll(pagination: PaginationDTO): Promise<UserEntity[]> {
    const results = await this.casdoor.getUsers();
    return plainToInstance(UserEntity, results.data.data, {
      excludeExtraneousValues: true
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
