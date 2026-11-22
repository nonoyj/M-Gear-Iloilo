import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PRODUCTS } from '../data/products'
import type { Product } from '../data/products'
import { StoreContext } from './storeContext'
import type { Store } from './storeContext'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: ignore */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Record<number, number>>(() => load('mgear-cart', {}))
  const [favs, setFavs] = useState<number[]>(() => load('mgear-favs', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => save('mgear-cart', cart), [cart])
  useEffect(() => save('mgear-favs', favs), [favs])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartOpen(false)
        setCheckoutOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = cartOpen || checkoutOpen ? 'hidden' : ''
  }, [cartOpen, checkoutOpen])

  const value = useMemo<Store>(() => {
    const flash = (msg: string) => {
      setToast(msg)
      window.clearTimeout(toastTimer.current)
      toastTimer.current = window.setTimeout(() => setToast(null), 2200)
    }
    return {
      lines: Object.entries(cart)
        .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
        .filter((l): l is { product: Product; qty: number } => !!l.product),
      cartCount: Object.values(cart).reduce((a, b) => a + b, 0),
      favs,
      query,
      setQuery,
      flash,
      toast,
      addToCart: (id) => {
        setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
        flash(`Added “${PRODUCTS.find((p) => p.id === id)?.name}” to cart`)
      },
      changeQty: (id, delta) =>
        setCart((c) => {
          const next = { ...c, [id]: (c[id] ?? 0) + delta }
          if (next[id] <= 0) delete next[id]
          return next
        }),
      removeLine: (id) =>
        setCart((c) => {
          const next = { ...c }
          delete next[id]
          return next
        }),
      clearCart: () => setCart({}),
      toggleFav: (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      checkoutOpen,
      openCheckout: () => setCheckoutOpen(true),
      closeCheckout: () => setCheckoutOpen(false),
    }
  }, [cart, favs, query, toast, cartOpen, checkoutOpen])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
