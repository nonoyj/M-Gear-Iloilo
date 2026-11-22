import { peso } from '../lib/format'
import { FREE_SHIPPING_AT, computeTotals } from '../lib/pricing'
import type { Line } from '../lib/pricing'
import { CloseIcon, TruckIcon } from './Icons'
import { ProductArt } from './ProductArt'

interface Props {
  lines: Line[]
  onClose: () => void
  onQty: (id: number, delta: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export function CartDrawer({ lines, onClose, onQty, onRemove, onCheckout }: Props) {
  const { subtotal, shipping } = computeTotals(lines)
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal)

  return (
    <div className="overlay overlay--right" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" onClick={(e) => e.stopPropagation()}>
        <header className="drawer__head">
          <h2>Your cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <CloseIcon size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <h3>Your cart is empty</h3>
            <p>Find something that makes noise.</p>
            <button className="btn" onClick={onClose}>
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="ship-meter">
              <p>
                <TruckIcon size={15} />{' '}
                {remaining === 0 ? 'You unlocked free shipping!' : `Add ${peso(remaining)} more for free shipping`}
              </p>
              <div className="ship-meter__bar">
                <span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)}%` }} />
              </div>
            </div>
            <ul className="drawer__list">
              {lines.map(({ product: p, qty }) => (
                <li key={p.id} className="line">
                  <div className="line__art">
                    <ProductArt category={p.category} seed={p.id} image={p.image} alt={p.name} />
                  </div>
                  <div className="line__info">
                    <h4>{p.name}</h4>
                    <p>{p.condition}</p>
                    <div className="qty">
                      <button onClick={() => onQty(p.id, -1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => onQty(p.id, 1)} aria-label="Increase quantity">
                        +
                      </button>
                      <button className="link" onClick={() => onRemove(p.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong>{peso(p.price * qty)}</strong>
                </li>
              ))}
            </ul>
            <footer className="drawer__foot">
              <div className="sum">
                <span>Subtotal</span>
                <span>{peso(subtotal)}</span>
              </div>
              <div className="sum">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : peso(shipping)}</span>
              </div>
              <div className="sum sum--total">
                <span>Estimated total</span>
                <span>{peso(subtotal + shipping)}</span>
              </div>
              <p className="muted small">Delivery option and payment method are chosen at checkout. Prices include 12% VAT.</p>
              <button className="btn btn--lg btn--block" onClick={onCheckout}>
                Proceed to checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
