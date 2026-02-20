'use client'

import { useState } from 'react'

export default function ApiTestPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/debug-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true })
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Debug Tool</h1>
      <button 
        onClick={testApi}
        style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Testing...' : 'Test OpenAI API'}
      </button>
      
      {result && (
        <pre style={{ background: '#f3f4f6', padding: '20px', marginTop: '20px', borderRadius: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
