import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'
import { Alert } from '@/types/alert'

export const useUserAlerts = () => {
  const { user } = useUser()
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    if (!user) return

    const ref = collection(db, 'users', user.uid, 'alerts')
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Alert[]
      setAlerts(data)
    })

    return () => unsubscribe()
  }, [user])

  const deleteAlert = async (id: string) => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'alerts', id))
  }

  return { alerts, deleteAlert }
}
