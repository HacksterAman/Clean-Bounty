import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

// Use the latest Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface WasteTypeAIResult {
  waste_types: {
    type: string;
    confidence: number;
    description: string;
    points: number;
  }[];
}

export interface BountyDescription {
  bounty_title: string;
  target_waste: string[];
  potential_hazards: string;
  cleanup_approach: string;
  reward_points: Record<string, number>;
}

export const analyzeImage = async (imageUrl: string): Promise<WasteTypeAIResult> => {
  try {
    // Convert image URL to base64
    const imageResponse = await fetch(imageUrl);
    const blob = await imageResponse.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const prompt = `Analyze this image and return a JSON object with the following structure:\n\n{
  "waste_types": [
    {
      "type": string, // e.g. "Plastic", "Paper", "Organic", "Metal", "Glass", "Electronic"
      "confidence": number, // between 0 and 1, sum of all confidence values should be <= 1, and each value should reflect the likelihood of that waste type being present (e.g. 0.7 for plastic, 0.2 for paper, 0.1 for metal)
      "description": string, // short description of the waste type found
      "points": number // points for this waste type (Plastic:10, Paper:5, Organic:3, Metal:15, Glass:8, Electronic:20)
    },
    ...
  ]
}\n\nOnly return valid JSON. Do not include any explanation or markdown. If no waste is detected, return an empty array for waste_types.`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64.split(',')[1]
        }
      }
    ]);

    const geminiResponse = await result.response;
    // Try to parse the JSON from the response
    const text = geminiResponse.text().trim();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    const parsed: WasteTypeAIResult = JSON.parse(jsonString);

    // Normalize confidence values if sum > 1
    const totalConfidence = parsed.waste_types.reduce((sum, wt) => sum + wt.confidence, 0);
    if (totalConfidence > 1 && parsed.waste_types.length > 0) {
      parsed.waste_types = parsed.waste_types.map(wt => ({
        ...wt,
        confidence: wt.confidence / totalConfidence
      }));
    }
    return parsed;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Initialize text model for description generation
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateBountyDescription = async (imageAnalysis: string): Promise<BountyDescription> => {
  try {
    const prompt = `Given the following waste analysis JSON, generate a bounty description as a JSON object with these fields:\n\n{
  "bounty_title": string, // catchy title for the cleanup
  "target_waste": string[], // array of waste types
  "potential_hazards": string, // hazards to be aware of
  "cleanup_approach": string, // recommended cleanup approach
  "reward_points": object // mapping of waste type to points
}\n\nOnly return valid JSON. Do not include any explanation or markdown. Here is the analysis:\n${imageAnalysis}`;
    const result = await textModel.generateContent([
      { text: prompt }
    ]);
    const geminiResponse = await result.response;
    const text = geminiResponse.text().trim();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating bounty description:', error);
    throw error;
  }
}; 