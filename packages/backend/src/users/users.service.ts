import { Inject, Injectable } from '@nestjs/common';
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
}
