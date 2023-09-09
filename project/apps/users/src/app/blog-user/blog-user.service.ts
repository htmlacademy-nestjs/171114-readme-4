import { Injectable } from '@nestjs/common';
import { BlogUserRepository } from '../../../../../libs/repositories/user-repository/src/lib/blog-user.repository';
import { User } from '@project/shared/app-types';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly userRepository: BlogUserRepository,
  ) {
  }
  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findByEmail(id);
  }
}
