import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageRequest, Message } from '../model/chat.model';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  private users = new Map();
  private messages: Message[] = [];
  private conversations;

  @SubscribeMessage('joinPrivateMessage')
  handleJoinPrivateMessage(client: Socket, username: string) {
    const user = { id: client.id, username };

    console.log(user);
    this.users.set(user.id, user.username);

    return { status: 'Success' };
  }

  @SubscribeMessage('sendPrivateMessage')
  async handleMessage(client: Socket, text: string) {
    const user = this.users.get(client.id);
    const conversation = this.conversations.get(client.id);

    if (!user) {
      return { status: 'error', message: 'User not found' };
    }

    const messageData: CreateMessageRequest = {
      message: text,
      user_id: user.id,
      conversation_id: conversation.id,
      // created_at: new Date(),
    };

    const message = await this.chatService.createMessage(messageData);
    this.messages.push(message);
    if (this.messages.length > 50) {
      this.messages.shift();
    }

    this.server.emit('receivePrivateMessage', messageData);

    return {
      status: 'success',
    };
  }
}
