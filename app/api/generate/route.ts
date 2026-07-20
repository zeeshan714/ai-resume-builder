import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key should be set when using the Gemini API." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { fullName, jobTitle, skills, experience, education } = body;

    const prompt = `Generate a professional, ATS-friendly resume layout in clean HTML (using Tailwind CSS classes) based on the following details:
    - Full Name: ${fullName}
    - Target Job Title: ${jobTitle}
    - Skills: ${skills}
    - Experience: ${experience}
    - Education: ${education}
    
    Return only the clean HTML code for the resume body. Do not include markdown code block backticks like \`\`\`html, just return the raw HTML string.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ resume: text });
  } catch (error: any) {
    console.error("Error generating resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate resume" },
      { status: 500 }
    );
  }
}