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

export async function GET(request, { params }) {
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

    // Get resume by ID
    const resumeId = params.id
    const resumeDoc = await db.collection('resumes').doc(resumeId).get()

    if (!resumeDoc.exists) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    const resumeData = resumeDoc.data()
    
    // Verify ownership
    if (resumeData.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ 
      success: true, 
      resume: {
        id: resumeDoc.id,
        ...resumeData
      }
    })

  } catch (error) {
    console.error('Get resume error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
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

    // Get resume by ID
    const resumeId = params.id
    const resumeDoc = await db.collection('resumes').doc(resumeId).get()

    if (!resumeDoc.exists) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    const resumeData = resumeDoc.data()
    
    // Verify ownership
    if (resumeData.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Delete the resume
    await db.collection('resumes').doc(resumeId).delete()

    return NextResponse.json({ 
      success: true, 
      message: 'Resume deleted successfully'
    })

  } catch (error) {
    console.error('Delete resume error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
