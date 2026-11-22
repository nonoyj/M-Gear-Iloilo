import { createContext, useContext } from 'react'
import type { Line } from '../lib/pricing'

export interface Store {
  lines: Line[]
  cartCount: number
  favs: number[]
  query: string
  setQuery: (q: string) => void
  addToCart: (id: number) => void
  changeQty: (id: number, delta: number) => void
  removeLine: (id: number) => void
  clearCart: () => void
  toggleFav: (id: number) => void
  flash: (msg: string) => void
  toast: string | null
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  checkoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void
}

export const StoreContext = createContext<Store | null>(null)

export function useStore(): Store {
  const s = useContext(StoreContext)
  if (!s) throw new Error('useStore must be used inside <StoreProvider>')
  return s
}
