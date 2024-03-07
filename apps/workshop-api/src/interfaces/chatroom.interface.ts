// {
//   "roomName": "General",
//   "users": ["user1", "user2", "user3"],
//   "messages": [
//     {
//       "user": "user1",
//       "content": "Hello, everyone!",
//       "timestamp": "2024-03-06T12:00:00Z"
//     },
//     {
//       "user": "user2",
//       "content": "Hi, user1!",
//       "timestamp": "2024-03-06T12:01:00Z"
//     }
//   ]
// }
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
