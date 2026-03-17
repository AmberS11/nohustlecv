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

export async function GET(request) {
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

    // Get user's resumes from Firestore
    const resumesSnapshot = await db
      .collection('resumes')
      .where('userId', '==', userId)
      .orderBy('updatedAt', 'desc')
      .get()

    const resumes = resumesSnapshot.docs.map(doc => ({
      id: doc.id,
      templateId: doc.data().templateId,
      updatedAt: doc.data().updatedAt,
      // Send minimal data for dashboard list
      data: {
        personal: {
          name: doc.data().data?.personal?.name || 'Untitled'
        }
      }
    }))

    return NextResponse.json({ success: true, resumes })

  } catch (error) {
    console.error('List error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
