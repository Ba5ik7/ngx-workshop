export interface IOpenAIResponse {
  choices: IOpenAIResponseChoice[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: IOpenAIResponseUsage;
}

export interface IOpenAIResponseChoice {
  finish_reason: string;
  index: number;
  message: IOpenAIResponseMessage;
  logprobs: null;
}

export interface IOpenAIResponseMessage {
  content: string;
  role: string;
}

export interface IOpenAIResponseUsage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}



