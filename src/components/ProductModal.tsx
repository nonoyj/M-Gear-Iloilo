import type { Product } from '../data/products'
import { peso } from '../lib/format'
import { CloseIcon, HeartIcon, ShieldIcon, StarIcon, TruckIcon } from './Icons'
import { ProductArt } from './ProductArt'

interface Props {
  product: Product
  isFav: boolean
  onClose: () => void
  onToggleFav: (id: number) => void
  onAdd: (id: number) => void
}

export function ProductModal({ product: p, isFav, onClose, onToggleFav, onAdd }: Props) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <CloseIcon size={20} />
        </button>
        <div className="modal__media">
          <ProductArt category={p.category} seed={p.id} image={p.image} alt={p.name} large />
        </div>
        <div className="modal__info">
          <p className="card__cond">
            {p.condition} · {p.brand}
          </p>
          <h2>{p.name}</h2>
          <p className="rating">
            <StarIcon size={15} /> {p.rating.toFixed(1)} <em>({p.reviews} seller reviews)</em>
          </p>
          <div className="modal__price">
            <strong>{peso(p.price)}</strong>
            {p.was && <s>{peso(p.was)}</s>}
          </div>
          <p className="card__ship">
            <TruckIcon size={15} /> {p.shipping === 0 ? 'Free shipping' : `+${peso(p.shipping)} shipping`} · Ships from{' '}
            {p.location}
          </p>
          <p className="modal__desc">{p.description}</p>
          <dl className="specs">
            {p.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="modal__actions">
            <button className="btn btn--lg" onClick={() => onAdd(p.id)}>
              Add to cart
            </button>
            <button className={`btn btn--ghost btn--lg${isFav ? ' btn--on' : ''}`} onClick={() => onToggleFav(p.id)}>
              <HeartIcon size={18} filled={isFav} /> {isFav ? 'Watching' : 'Watch'}
            </button>
          </div>
          <p className="modal__trust">
            <ShieldIcon size={16} /> Sold by {p.seller}. Covered by M-Gear Buyer Protection (demo).
          </p>
        </div>
      </div>
    </div>
  )
}
