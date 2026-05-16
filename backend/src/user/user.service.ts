import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: number): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw Error('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };
  }

  async register(user: User): Promise<User> {
    // const inputUser = zod user
    const checkUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            username: user.username,
          },
          {
            email: user.email,
          },
        ],
      },
    });

    if (checkUser) {
      throw Error('user already registered');
    }

    const register = await this.prismaService.user.create({
      data: checkUser,
    });

    return {
      id: register.id,
      username: register.username,
      name: register.name,
      email: register.email,
    };
  }
}
