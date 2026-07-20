import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { fullName, targetJob, skills, experience, education } = await req.json();

    const prompt = `Create a clean, professional HTML-formatted resume for:
Name: ${fullName}
Job Title: ${targetJob}
Skills: ${skills}
Experience: ${experience}
Education: ${education}

Include sections with clean HTML tags (like h2, p, ul, li):
- Professional Summary
- Skills
- Work Experience
- Education
Return ONLY the clean HTML code.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '<p>Failed to generate resume.</p>';
    return NextResponse.json({ resume: text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}