import { NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

// Initialize Firebase Admin (only once)
const apps = getApps()
if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const auth = getAuth()
const db = getFirestore()

export async function POST(request) {
  try {
    // Get auth token from header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]
    
    // Verify token
    const decodedToken = await auth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Get resume data from request
    const { resumeId, resumeData, templateId } = await request.json()

    // Prepare resume document
    const resumeDoc = {
      userId,
      data: resumeData,
      templateId,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    let docRef
    if (resumeId) {
      // Update existing resume
      docRef = db.collection('resumes').doc(resumeId)
      await docRef.update({
        data: resumeData,
        templateId,
        updatedAt: new Date().toISOString(),
      })
    } else {
      // Create new resume
      docRef = db.collection('resumes').doc()
      resumeDoc.id = docRef.id
      await docRef.set(resumeDoc)
    }

    return NextResponse.json({ 
      success: true, 
      resumeId: resumeId || docRef.id 
    })

  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
