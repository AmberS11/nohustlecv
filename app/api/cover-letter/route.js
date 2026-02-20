import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { role, company, jobDescription, tone, userData } = await request.json()

    // Validate input
    if (!role || !company) {
      return NextResponse.json(
        { success: false, error: 'Role and company are required' },
        { status: 400 }
      )
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set')
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

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
      model: "gpt-3.5-turbo", // Changed from gpt-4 to save costs
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
    console.error('OpenAI Error details:', error)
    
    // Check if it's an OpenAI API error
    if (error.response) {
      console.error('OpenAI API response:', error.response.data)
      return NextResponse.json(
        { success: false, error: `OpenAI API error: ${error.response.data.error.message}` },
        { status: error.response.status }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to generate cover letter. Please try again.' },
      { status: 500 }
    )
  }
}
