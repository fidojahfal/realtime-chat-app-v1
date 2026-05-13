import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Message } from '../model/chat.model';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async getMessage(user_id: number, conversation_id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw Error('User not found');
    }

    const conversation = await this.prismaService.conversation.findUnique({
      where: {
        id: conversation_id,
      },
    });

    if (!conversation) {
      throw Error('Conversation not found');
    }

    const messages = await this.prismaService.message.findMany({
      where: {
        AND: [
          {
            user_id: user_id,
          },
          {
            conversation_id: conversation_id,
          },
        ],
      },
    });

    return messages;
  }
}
