import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client.
// Note: In a real production app, ensure API keys are secured via backend proxy or appropriate restrictions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are a high-end salon virtual consultant for "LuxeSalon". 
Your goal is to help users choose hairstyles, beard styles, or spa treatments based on their description.
Keep answers concise, friendly, and professional. 
If a user asks about services, recommend one of the following: Haircut, Beard Sculpting, Facial, Manicure.
Do not mention prices unless asked. Focus on aesthetics and suitability for face shapes.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the consultation service. Please try again later.";
  }
};