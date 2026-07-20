import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, jobTitle, skills, experience, education } = await req.json();

    const prompt = `Create a clean and professional resume for:
Name: ${fullName}
Job Title: ${jobTitle}
Skills: ${skills}
Experience: ${experience}
Education: ${education}

Include sections:
- Professional Summary
- Skills
- Work Experience
- Education`;

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "openai",
      }),
    });

    if (!response.ok) {
      throw new Error("AI Generation failed");
    }

    const text = await response.text();
    return NextResponse.json({ result: text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}