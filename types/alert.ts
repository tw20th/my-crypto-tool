export type Alert = {
  id: string
  coinId: string
  condition: 'over' | 'under'
  price: number
  notified?: boolean // ← ✅ 追加！（optionalにしておくと安全）
}
