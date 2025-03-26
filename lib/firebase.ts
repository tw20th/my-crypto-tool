// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCVsFx06sHAjR5et9-yES443TyHjfPqpZQ',
  authDomain: 'my-crypto-tool.firebaseapp.com',
  projectId: 'my-crypto-tool',
  storageBucket: 'my-crypto-tool.firebasestorage.app',
  messagingSenderId: '342808572885',
  appId: '1:342808572885:web:1a11192b1950d3d68b435c',
  measurementId: 'G-XN76S896WT',
}

// ✅ app を一度だけ定義して export！
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
