import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // サービスアカウントキー使う場合はここ変更
  })
}

export const db = admin.firestore()
