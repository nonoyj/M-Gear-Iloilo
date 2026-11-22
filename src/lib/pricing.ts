import type { Product } from '../data/products'

export const FREE_SHIPPING_AT = 25000
export const EXPRESS_FEE = 350
// Philippine VAT is 12% and shelf prices are VAT-inclusive, so it is shown, not added.
export const VAT_RATE = 0.12

export type ShipMethod = 'standard' | 'express' | 'pickup'

// Demo promo codes (percent off the subtotal).
export const PROMOS: Record<string, number> = { DINAGYANG10: 0.1 }

export interface Line {
  product: Product
  qty: number
}

export function computeTotals(lines: Line[], method: ShipMethod = 'standard', promoPct = 0) {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const discount = Math.round(subtotal * promoPct * 100) / 100
  const baseShipping = subtotal >= FREE_SHIPPING_AT ? 0 : lines.reduce((s, l) => s + l.product.shipping, 0)
  // Free in-store pick-up in Iloilo City; otherwise delivery (+ optional express fee).
  const shipping = method === 'pickup' ? 0 : baseShipping + (method === 'express' ? EXPRESS_FEE : 0)
  const vat = Math.round(((subtotal - discount) * VAT_RATE / (1 + VAT_RATE)) * 100) / 100
  const total = subtotal - discount + shipping
  return { subtotal, discount, shipping, tax: vat, total }
}
