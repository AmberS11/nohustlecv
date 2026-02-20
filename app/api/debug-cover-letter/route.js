import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request) {
  const debug = {
    steps: [],
    errors: []
  }

  try {
    debug.steps.push('Started')
    
    // Check environment variable
    if (!process.env.OPENAI_API_KEY) {
      debug.errors.push('OPENAI_API_KEY is missing')
      return NextResponse.json({ success: false, debug }, { status: 500 })
    }
    debug.steps.push('API key found, length: ' + process.env.OPENAI_API_KEY.length)

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    debug.steps.push('OpenAI initialized')

    // Parse request
    const body = await request.json()
    debug.steps.push('Request parsed')
    debug.body = body

    // Make a simple test call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say 'API is working' in JSON format" }
      ],
      max_tokens: 20,
    })
    debug.steps.push('OpenAI call successful')
    debug.response = completion.choices[0].message.content

    return NextResponse.json({ 
      success: true, 
      debug,
      message: 'API is configured correctly'
    })

  } catch (error) {
    debug.steps.push('Error caught')
    debug.errors.push({
      name: error.name,
      message: error.message,
      stack: error.stack?.split('\n')[0]
    })
    
    console.error('Debug API Error:', error)
    return NextResponse.json({ 
      success: false, 
      debug 
    }, { status: 500 })
  }
}
