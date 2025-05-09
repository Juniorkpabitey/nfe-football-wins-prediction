declare module "@google/generative-ai" {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(options: { model: string }): GenerativeModel;
  }

  interface GenerativeModel {
    startChat(options: {
      history: Array<{
        role: "user" | "model" | "system";
        parts: Array<{ text: string }>;
      }>;
    }): ChatSession;
  }

  interface ChatSession {
    sendMessage(prompt: string): Promise<{
      response: {
        text(): string;
      };
    }>;
  }
}
