// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!process.env.FIREBASE_ADMIN_KEY_BASE64) {
  throw new Error('FIREBASE_ADMIN_KEY_BASE64 is not set')
}

// 🔽 base64 を decode → JSON parse
const decoded = Buffer.from(
  process.env.FIREBASE_ADMIN_KEY_BASE64,
  'base64'
).toString('utf8')
const serviceAccount = JSON.parse(decoded)

export const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      })
    : getApps()[0]

export const adminDb = getFirestore(adminApp)
