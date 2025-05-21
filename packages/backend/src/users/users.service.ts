import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CASDOOR_PROVIDER } from 'src/casdoor/casdoor.provider';
import { SDK as CasdoorSDK } from 'casdoor-nodejs-sdk';
import { PaginationDTO } from 'src/pagination/pagination.dto';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { CasdoorService } from '../casdoor/casdoor.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CASDOOR_PROVIDER) private readonly casdoor: CasdoorSDK,
    private readonly casdoorService: CasdoorService
  ) {}

  async findAll(pagination: PaginationDTO): Promise<UserEntity[]> {
    const results = await this.casdoor.getUsers();
    return plainToInstance(UserEntity, results.data.data, {
      excludeExtraneousValues: true
    });
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const found = await this.casdoor.getUser(id);
    if (found.status == 404) {
      return null;
    }
    return plainToInstance(UserEntity, found.data.data);
  }

  async count(): Promise<number> {
    // Passing in a boolean for "isOnline" seems to result in an error
    // Also the return types do not match
    return ((await this.casdoor.getUserCount(0 as any)).data as any).data;
  }

  async isTrainingComplete(id: string): Promise<boolean> {
    const found = await this.casdoorService.findById(id);
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return found.education == 'true';
  }

  async markTrainingComplete(id: string): Promise<void> {
    const found = await this.casdoorService.findById(id);
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    found.education = 'true';
    await this.casdoor.updateUser(found);
  }
}
