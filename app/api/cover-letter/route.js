import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { role, company, jobDescription, tone, userData } = await request.json()

    const prompt = `Write a professional cover letter for a ${role} position at ${company}.
    ${jobDescription ? `Job Description: ${jobDescription}` : ''}
    Tone: ${tone || 'professional'}
    
    The candidate's background:
    - Name: ${userData?.personal?.name || 'Candidate'}
    - Current role: ${userData?.personal?.title || 'Professional'}
    - Key skills: ${userData?.skills?.join(', ') || 'Various'}
    - Experience highlights: ${userData?.experience?.map(e => e.role).join(', ') || 'Relevant experience'}
    
    The cover letter should be personalized, highlight relevant skills, and end with a call to action.
    Keep it to 3-4 paragraphs.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "You are an expert career coach specializing in cover letters." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return NextResponse.json({ 
      success: true, 
      letter: completion.choices[0].message.content 
    })

  } catch (error) {
    console.error('OpenAI Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate cover letter' },
      { status: 500 }
    )
  }
}
