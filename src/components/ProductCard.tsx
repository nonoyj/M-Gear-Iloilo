import { Link } from 'react-router-dom'
import { useStore } from '../context/storeContext'
import type { Product } from '../data/products'
import { peso } from '../lib/format'
import { HeartIcon, StarIcon, TruckIcon } from './Icons'
import { ProductArt } from './ProductArt'

export function ProductCard({ product: p }: { product: Product }) {
  const { favs, toggleFav, addToCart } = useStore()
  const isFav = favs.includes(p.id)
  const to = `/product/${p.id}`

  return (
    <article className="card">
      <Link className="card__media" to={to} aria-label={`View ${p.name}`}>
        <ProductArt category={p.category} seed={p.id} image={p.image} alt={p.name} />
        {p.tag && <span className={`badge badge--${p.tag.replace(' ', '').toLowerCase()}`}>{p.tag}</span>}
      </Link>
      <button
        className={`fav${isFav ? ' fav--on' : ''}`}
        onClick={() => toggleFav(p.id)}
        aria-label={isFav ? 'Remove from watchlist' : 'Add to watchlist'}
        aria-pressed={isFav}
      >
        <HeartIcon size={18} filled={isFav} />
      </button>
      <div className="card__body">
        <p className="card__cond">{p.condition}</p>
        <h3 className="card__title">
          <Link to={to}>{p.name}</Link>
        </h3>
        <p className="card__seller">
          {p.seller} · {p.location}
        </p>
        <div className="card__price">
          <strong>{peso(p.price)}</strong>
          {p.was && <s>{peso(p.was)}</s>}
          {p.was && <span className="card__save">{Math.round((1 - p.price / p.was) * 100)}% off</span>}
        </div>
        <p className="card__ship">
          <TruckIcon size={14} /> {p.shipping === 0 ? 'Free shipping' : `+${peso(p.shipping)} shipping`}
        </p>
        <div className="card__foot">
          <span className="rating">
            <StarIcon size={14} /> {p.rating.toFixed(1)} <em>({p.reviews})</em>
          </span>
          <Link className="card__more" to={to}>
            View details
          </Link>
          <button className="btn btn--sm" onClick={() => addToCart(p.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
