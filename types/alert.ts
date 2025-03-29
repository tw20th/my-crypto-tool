// types/alert.ts

export type Alert = {
  id: string
  coinId: string
  condition: 'over' | 'under'
  price: number
}
