import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, targetJob, skills, experience, education } = await req.json();

    const prompt = `Create a clean and professional HTML formatted resume using Tailwind classes or clean tags (like h2, p, ul, li) for:
Name: ${fullName}
Job Title: ${targetJob}
Skills: ${skills}
Experience: ${experience}
Education: ${education}

Include sections with nice styling:
- Professional Summary
- Skills
- Work Experience
- Education
Return ONLY the HTML code inside a div container, no markdown blocks like triple backticks if possible, just clean HTML.`;

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "openai",
        jsonMode: false,
      }),
    });

    if (!response.ok) {
      throw new Error("AI Generation failed");
    }

    const text = await response.text();
    // Return with the key expected by frontend
    return NextResponse.json({ resume: text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}