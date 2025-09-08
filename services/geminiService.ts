
import { GoogleGenAI } from "@google/genai";

// FIX: Adhering to coding guidelines to use process.env.API_KEY directly.
if (!process.env.API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we'll throw an error if the key is missing.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCountryInfo = async (countryName: string): Promise<string> => {
  const prompt = `Provide a single, interesting, and concise fact about ${countryName}. Keep it under 200 characters.`;

  const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
  });

  if (response && response.text) {
    return response.text.trim();
  } else {
    throw new Error("No text returned from Gemini API");
  }
};
