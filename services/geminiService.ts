import { GoogleGenAI } from "@google/genai";

// Ensure API key is present; in a real app, handle this more gracefully if missing.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getTravelAdvice = async (userPrompt: string): Promise<string> => {
  if (!apiKey) {
    return "נא להגדיר מפתח API כדי להשתמש ביועץ הטיולים.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      אתה סוכן נסיעות מומחה לתאילנד, דובר עברית.
      שם הסוכנות הוא "עפים רחוק" (Afim Rahok).
      קהל היעד שלך הוא ישראלים (זוגות, משפחות, צעירים).
      המטרה שלך היא לתת תשובות קצרות, מועילות ומזמינות.
      תמיד תמליץ בסוף התשובה ליצור קשר עם הסוכנות שלנו "עפים רחוק" לבניית מסלול מותאם אישית.
      אל תיתן מחירים מדויקים אלא הערכות בלבד.
      ענה בעברית בלבד.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "מצטערים, לא הצלחתי ליצור תשובה כרגע. נסה שוב מאוחר יותר.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "אירעה שגיאה בתקשורת עם יועץ הטיולים. אנא נסו שנית או צרו קשר בטלפון.";
  }
};