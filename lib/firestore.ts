import { db } from './firebase'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'

export const getWatchlist = async (uid: string) => {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data()?.watchlist ?? [] : []
}

export const addToWatchlist = async (uid: string, coinId: string) => {
  const ref = doc(db, 'users', uid)
  await setDoc(ref, { watchlist: arrayUnion(coinId) }, { merge: true })
}

export const removeFromWatchlist = async (uid: string, coinId: string) => {
  const ref = doc(db, 'users', uid)
  await updateDoc(ref, { watchlist: arrayRemove(coinId) })
}
