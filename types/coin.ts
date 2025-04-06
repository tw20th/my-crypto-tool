// types/coin.ts

export type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h?: number
  market_cap: number // ここを追加！
}
