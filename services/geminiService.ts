import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sentiment: {
      type: Type.STRING,
      enum: ["Positive", "Neutral", "Negative"],
      description: "The overall sentiment of the feedback.",
    },
    painPoint: {
      type: Type.STRING,
      description: "The key pain point mentioned in the feedback. If none, return 'None'. Keep it concise.",
    },
    highlight: {
      type: Type.STRING,
      description: "The top positive highlight from the feedback. Use quotes if extracting directly. If none, return 'None'.",
    },
  },
  required: ["sentiment", "painPoint", "highlight"],
};

export const analyzeFeedback = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following customer feedback and extract insights:\n\n"${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert customer experience analyst. Your job is to extract clear, actionable insights from raw customer feedback.",
        temperature: 0.1, // Low temperature for consistent extraction
      },
    });

    const resultText = response.text;
    if (!resultText) {
        throw new Error("No response from AI");
    }
    
    return JSON.parse(resultText) as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    throw error;
  }
};