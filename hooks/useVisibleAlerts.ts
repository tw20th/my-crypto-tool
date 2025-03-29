import { useState } from 'react'
import { Alert } from '@/types/alert'

export const useVisibleAlerts = (matchedAlerts: Alert[]) => {
  const [hiddenAlerts, setHiddenAlerts] = useState<string[]>([])

  const visibleAlerts = matchedAlerts.filter(
    (alert) => !hiddenAlerts.includes(alert.id)
  )

  const onClose = (id: string) => {
    setHiddenAlerts((prev) => [...prev, id])
  }

  const onCloseAll = () => {
    setHiddenAlerts(visibleAlerts.map((a) => a.id))
  }

  return { visibleAlerts, onClose, onCloseAll }
}
