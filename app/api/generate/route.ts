import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // Yahan aap AI model (jaise Gemini ya OpenAI) ka code integrate kar sakte hain
    // Filhal hum NHO portal ki maloomat ke mutabiq AI response bhej rahe hain

    let aiResponse = "NHO (Nutraceutical Health Organization) Multan mein Khanewal Road, Chowk Kumharan par waqay hai.";

    if (prompt && prompt.toLowerCase().includes('salary')) {
      aiResponse = "Matric ki tankhuwah 28,000 se 30,000, Intermediate ki 30,000 se 35,000 aur Graduation ki 35,000 se 40,000 rupay hai.";
    } else if (prompt && prompt.toLowerCase().includes('job')) {
      aiResponse = "NHO mein office work, customer dealing aur health consultant ki asamiyaan mojood hain. 8 ghante duty hai.";
    }

    return NextResponse.json({ success: true, response: aiResponse });

  } catch (error: any) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}