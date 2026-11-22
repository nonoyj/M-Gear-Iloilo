import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { peso2 } from '../lib/format'
import { PROMOS, computeTotals, EXPRESS_FEE, VAT_RATE } from '../lib/pricing'
import type { Line, ShipMethod } from '../lib/pricing'
import { CloseIcon, ShieldIcon } from './Icons'
import { ProductArt } from './ProductArt'

type Pay = 'gcash' | 'maya' | 'card' | 'cod' | 'bank'

const PAY_LABELS: Record<Pay, string> = {
  gcash: 'GCash',
  maya: 'Maya',
  card: 'Credit / debit card',
  cod: 'Cash on delivery (COD)',
  bank: 'Online banking / bank transfer',
}

const DELIVERY_LABELS: Record<ShipMethod, string> = {
  standard: 'Standard delivery (Iloilo & Panay 1–3 days, rest of PH 3–7 business days)',
  express: 'Express delivery (Iloilo City & nearby towns, same or next day)',
  pickup: 'Free pick-up at our Iloilo City store (we will text you when it is ready)',
}

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', address2: '', barangay: '', city: '', state: 'Iloilo', zip: '', country: 'Philippines',
  notes: '', cardName: '', cardNumber: '', expiry: '', cvc: '',
}
type Form = typeof EMPTY
type Errors = Partial<Record<keyof Form, string>>

function validate(f: Form, pay: Pay, method: ShipMethod): Errors {
  const e: Errors = {}
  const req = (k: keyof Form, msg: string) => { if (!f[k].trim()) e[k] = msg }
  req('firstName', 'Enter your first name')
  req('lastName', 'Enter your last name')
  if (method !== 'pickup') {
    req('address', 'Enter your house no. and street')
    req('barangay', 'Enter your barangay')
    req('city', 'Enter your city or municipality')
    req('state', 'Enter your province')
    if (!/^\d{4}$/.test(f.zip.trim())) e.zip = 'Enter a 4-digit ZIP code'
  }
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email'
  if (!/^(\+?63|0)9\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Use a PH mobile number, e.g. 0917 123 4567'
  if (pay === 'card') {
    req('cardName', 'Name on card')
    if (f.cardNumber.replace(/\s/g, '').length < 13) e.cardNumber = 'Enter a valid card number'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry)) e.expiry = 'Use MM/YY'
    if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = '3–4 digits'
  }
  return e
}

interface Order {
  id: string
  form: Form
  pay: Pay
  method: ShipMethod
  lines: Line[]
  totals: ReturnType<typeof computeTotals>
  promo: string | null
}

interface Props {
  lines: Line[]
  onClose: () => void
  onPlaced: () => void
}

export function Checkout({ lines, onClose, onPlaced }: Props) {
  const [f, setF] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [pay, setPay] = useState<Pay>('gcash')
  const [method, setMethod] = useState<ShipMethod>('standard')
  const [code, setCode] = useState('')
  const [promo, setPromo] = useState<string | null>(null)
  const [promoMsg, setPromoMsg] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  const totals = computeTotals(lines, method, promo ? PROMOS[promo] : 0)

  const set = (k: keyof Form, fmt?: (v: string) => string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = fmt ? fmt(e.target.value) : e.target.value
    setF((cur) => ({ ...cur, [k]: v }))
    if (errors[k]) setErrors((cur) => ({ ...cur, [k]: undefined }))
  }
  const fmtCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }
  const digits = (v: string) => v.replace(/\D/g, '').slice(0, 4)

  const applyPromo = () => {
    const c = code.trim().toUpperCase()
    if (PROMOS[c]) { setPromo(c); setPromoMsg(`${PROMOS[c] * 100}% off applied`) }
    else { setPromo(null); setPromoMsg('Invalid code (try DINAGYANG10)') }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(f, pay, method)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.querySelector('.field--error input, .field--error select')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    setOrder({
      id: `TG-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      form: { ...f, cardNumber: '', cvc: '', expiry: '' }, // never keep card data
      pay, method, lines, totals, promo,
    })
    onPlaced()
  }

  const field = (k: keyof Form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, fmt?: (v: string) => string, cls = '') => (
    <label className={`field ${cls}${errors[k] ? ' field--error' : ''}`}>
      <span>{label}</span>
      <input value={f[k]} onChange={set(k, fmt)} {...props} />
      {errors[k] && <em>{errors[k]}</em>}
    </label>
  )

  /* ---------- confirmation ---------- */
  if (order) {
    const o = order
    return (
      <div className="overlay" onClick={onClose}>
        <div className="checkout checkout--done" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__check">✓</div>
          <h2>Salamat, {o.form.firstName}! Your order is placed.</h2>
          <p className="muted">
            Order <b>{o.id}</b> · a confirmation would be sent to <b>{o.form.email}</b>. This is a demo, so nothing was charged or shipped.
          </p>
          <div className="done__grid">
            <div className="box">
              <h4>{o.method === 'pickup' ? 'Pick-up for' : 'Shipping to'}</h4>
              {o.method === 'pickup' ? (
                <p>{o.form.firstName} {o.form.lastName}<br />{o.form.phone}</p>
              ) : (
                <p>{o.form.firstName} {o.form.lastName}<br />{o.form.address}{o.form.address2 && <>, {o.form.address2}</>}<br />Brgy. {o.form.barangay}, {o.form.city}<br />{o.form.state} {o.form.zip}, {o.form.country}<br />{o.form.phone}</p>
              )}
              <h4>Delivery</h4>
              <p>{DELIVERY_LABELS[o.method]}</p>
              <h4>Payment</h4>
              <p>{PAY_LABELS[o.pay]}</p>
            </div>
            <div className="box">
              <h4>Receipt</h4>
              <ul className="receipt">
                {o.lines.map((l) => (
                  <li key={l.product.id}><span>{l.qty} × {l.product.name}</span><span>{peso2(l.product.price * l.qty)}</span></li>
                ))}
              </ul>
              <Totals t={o.totals} promo={o.promo} />
            </div>
          </div>
          <button className="btn btn--lg" onClick={onClose}>Continue shopping</button>
        </div>
      </div>
    )
  }

  /* ---------- checkout form ---------- */
  return (
    <div className="overlay" onClick={onClose}>
      <div className="checkout" role="dialog" aria-modal="true" aria-label="Checkout" onClick={(e) => e.stopPropagation()}>
        <header className="checkout__head">
          <h2>Checkout</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close checkout"><CloseIcon size={20} /></button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty"><h3>Your cart is empty</h3><button className="btn" onClick={onClose}>Back to shop</button></div>
        ) : (
          <form className="checkout__body" onSubmit={submit} noValidate>
            <div className="checkout__main">
              <section>
                <h3><b>1</b> Contact &amp; shipping address</h3>
                {method === 'pickup' && <p className="muted small pickup-note">Picking up in Iloilo City? You can skip the address fields, we only need your contact details.</p>}
                <div className="fields">
                  {field('firstName', 'First name', { autoComplete: 'given-name' })}
                  {field('lastName', 'Last name', { autoComplete: 'family-name' })}
                  {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'juan@email.com' })}
                  {field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', placeholder: '0917 123 4567' })}
                  {field('address', 'House no. & street', { autoComplete: 'address-line1' }, undefined, 'full')}
                  {field('address2', 'Building, unit, landmark (optional)', { autoComplete: 'address-line2' }, undefined, 'full')}
                  {field('barangay', 'Barangay', { placeholder: 'e.g. Jaro' })}
                  {field('city', 'City / Municipality', { autoComplete: 'address-level2', placeholder: 'e.g. Iloilo City' })}
                  {field('state', 'Province', { autoComplete: 'address-level1' })}
                  {field('zip', 'ZIP code', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 4, placeholder: '5000' }, (v) => v.replace(/\D/g, ''))}
                  <label className="field">
                    <span>Country</span>
                    <input value="Philippines" readOnly />
                  </label>
                  <label className="field full">
                    <span>Order notes (optional)</span>
                    <textarea rows={2} value={f.notes} onChange={set('notes')} placeholder="Delivery instructions, gift message, best time to call…" />
                  </label>
                </div>
              </section>

              <section>
                <h3><b>2</b> Delivery method</h3>
                <div className="options">
                  <label className={`opt${method === 'standard' ? ' opt--on' : ''}`}>
                    <input type="radio" name="ship" checked={method === 'standard'} onChange={() => setMethod('standard')} />
                    <div><b>Standard</b><small>Iloilo &amp; Panay 1–3 days · rest of PH 3–7 business days</small></div>
                    <span>{computeTotals(lines, 'standard').shipping === 0 ? 'Free' : peso2(computeTotals(lines, 'standard').shipping)}</span>
                  </label>
                  <label className={`opt${method === 'express' ? ' opt--on' : ''}`}>
                    <input type="radio" name="ship" checked={method === 'express'} onChange={() => setMethod('express')} />
                    <div><b>Express</b><small>Iloilo City &amp; nearby towns · same or next day</small></div>
                    <span>+{peso2(EXPRESS_FEE)}</span>
                  </label>
                  <label className={`opt${method === 'pickup' ? ' opt--on' : ''}`}>
                    <input type="radio" name="ship" checked={method === 'pickup'} onChange={() => setMethod('pickup')} />
                    <div><b>Pick up in store</b><small>Iloilo City showroom · ready in 1–2 days</small></div>
                    <span>Free</span>
                  </label>
                </div>
              </section>

              <section>
                <h3><b>3</b> Payment</h3>
                <div className="options">
                  {(Object.entries(PAY_LABELS) as [Pay, string][]).map(([id, label]) => (
                    <label key={id} className={`opt${pay === id ? ' opt--on' : ''}`}>
                      <input type="radio" name="pay" checked={pay === id} onChange={() => setPay(id)} />
                      <div><b>{label}</b></div>
                    </label>
                  ))}
                </div>
                {pay === 'card' && (
                  <div className="fields">
                    {field('cardName', 'Name on card', { autoComplete: 'cc-name' }, undefined, 'full')}
                    {field('cardNumber', 'Card number', { inputMode: 'numeric', autoComplete: 'cc-number', placeholder: '1234 5678 9012 3456' }, fmtCard, 'full')}
                    {field('expiry', 'Expiry (MM/YY)', { inputMode: 'numeric', autoComplete: 'cc-exp', placeholder: 'MM/YY' }, fmtExpiry)}
                    {field('cvc', 'CVC', { inputMode: 'numeric', autoComplete: 'cc-csc', placeholder: '123' }, digits)}
                  </div>
                )}
                {(pay === 'gcash' || pay === 'maya') && (
                  <p className="muted small">You'll be redirected to {PAY_LABELS[pay]} to approve the payment after placing your order (demo).</p>
                )}
                {pay === 'cod' && <p className="muted small">Pay in cash to the courier when your order arrives. Please prepare the exact amount.</p>}
                {pay === 'bank' && <p className="muted small">Bank details are sent to your email. Send proof of payment within 24 hours (demo).</p>}
                <p className="muted small"><ShieldIcon size={14} /> Demo only: payment details are never stored or sent anywhere.</p>
              </section>
            </div>

            <aside className="summary">
              <h3>Order summary</h3>
              <ul className="summary__items">
                {lines.map(({ product: p, qty }) => (
                  <li key={p.id}>
                    <div className="summary__art"><ProductArt category={p.category} seed={p.id} image={p.image} alt={p.name} /><i>{qty}</i></div>
                    <div><b>{p.name}</b><small>{p.condition}</small></div>
                    <span>{peso2(p.price * qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="promo">
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code (try DINAGYANG10)" aria-label="Promo code" />
                <button type="button" className="btn btn--sm btn--ghost" onClick={applyPromo}>Apply</button>
              </div>
              {promoMsg && <p className={`small ${promo ? 'ok' : 'bad'}`}>{promoMsg}</p>}
              <Totals t={totals} promo={promo} />
              <button className="btn btn--lg btn--block" type="submit">Place order · {peso2(totals.total)}</button>
              {Object.values(errors).some(Boolean) && <p className="small bad">Please fix the highlighted fields.</p>}
            </aside>
          </form>
        )}
      </div>
    </div>
  )
}

function Totals({ t, promo }: { t: ReturnType<typeof computeTotals>; promo: string | null }) {
  return (
    <div className="totals">
      <div className="sum"><span>Subtotal</span><span>{peso2(t.subtotal)}</span></div>
      {t.discount > 0 && <div className="sum ok"><span>Discount ({promo})</span><span>−{peso2(t.discount)}</span></div>}
      <div className="sum"><span>Shipping</span><span>{t.shipping === 0 ? 'Free' : peso2(t.shipping)}</span></div>
      <div className="sum"><span>VAT ({Math.round(VAT_RATE * 100)}%, included)</span><span>{peso2(t.tax)}</span></div>
      <div className="sum sum--total"><span>Total</span><span>{peso2(t.total)}</span></div>
    </div>
  )
}
