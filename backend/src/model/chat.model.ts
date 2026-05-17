export class MessageResponse {
  id: number;
  conversation_id: number;
  user_id: number;
  message: string;
}

export class CreateMessageRequest {
  conversation_id: number;
  user_id: number;
  message: string;
}
