import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMessageRequest, MessageResponse } from '../model/chat.model';

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

  async createMessage(data: CreateMessageRequest): Promise<MessageResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: data.user_id,
      },
    });

    if (!user) {
      throw Error('User not found');
    }

    const conversation = await this.prismaService.conversation.findUnique({
      where: {
        id: data.conversation_id,
      },
    });

    if (!conversation) {
      throw Error('Conversation not found');
    }

    const message = await this.prismaService.message.create({
      data: {
        user_id: data.user_id,
        conversation_id: data.conversation_id,
        message: data.message,
      },
    });

    return {
      id: message.id,
      user_id: message.user_id!,
      conversation_id: message.conversation_id!,
      message: message.message,
    };
  }
}
