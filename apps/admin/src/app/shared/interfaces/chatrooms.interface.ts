export interface IChatroom {
  roomName: string;
  users: string[];
  messages: IChatMessage[];
}

export interface IChatMessage {
  user: string;
  content: string;
  timestamp: string;
}