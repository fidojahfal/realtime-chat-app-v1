import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { User } from '../model/user.model';
import { WebResponse } from '../model/web.model';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getUser/:id')
  @HttpCode(200)
  async getUser(@Param('id') id: number): Promise<WebResponse<User>> {
    const user = await this.userService.getUser(id);

    return {
      data: user,
    };
  }
}
