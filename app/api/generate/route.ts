import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, jobTitle, skills, experience, education } = body;

    const prompt = `Generate a professional, ATS-friendly resume layout in clean HTML (using Tailwind CSS classes) based on the following details:
    - Full Name: ${fullName}
    - Target Job Title: ${jobTitle}
    - Skills: ${skills}
    - Experience: ${experience}
    - Education: ${education}
    
    Return only the clean HTML code for the resume body. Do not include markdown code block backticks like \`\`\`html, just return the raw HTML string.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ resume: response.text });
  } catch (error: any) {
    console.error("Error generating resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate resume" },
      { status: 500 }
    );
  }
}