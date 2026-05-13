import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '../model/chat.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users;
  private messages: Message[] = [];
  private conversations;

  @SubscribeMessage('sendPrivateMessage')
  handleMessage(client: Socket, text: string) {
    const user = this.users.get(client.id);
    const conversation = this.conversations.get(client.id);

    if (!user) {
      return { status: 'error', message: 'User not found' };
    }

    const createMessage = {
      id,
      message,
      user_id: user.id,
      conversation_id: conversation.id,
      // created_at: new Date(),
    };

    this.messages.push(createMessage);
    if (this.messages.length > 50) {
      this.messages.shift();
    }

    this.server.emit('receivePrivateMessage', createMessage);

    return {
      status: 'success',
    };
  }
}
