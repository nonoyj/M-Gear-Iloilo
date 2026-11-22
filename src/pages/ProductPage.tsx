import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { HeartIcon, ShieldIcon, StarIcon, TruckIcon } from '../components/Icons'
import { ProductArt } from '../components/ProductArt'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/storeContext'
import { BRAND } from '../data/site'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { peso } from '../lib/format'

export function ProductPage() {
  const { id } = useParams()
  const { favs, toggleFav, addToCart } = useStore()
  const p = PRODUCTS.find((x) => x.id === Number(id))

  if (!p) {
    return (
      <section className="wrap section">
        <div className="none">
          <h2>We couldn't find that product</h2>
          <p>It may have been sold already.</p>
          <Link className="btn" to="/shop">
            Back to shop
          </Link>
        </div>
      </section>
    )
  }

  const isFav = favs.includes(p.id)
  const categoryLabel = CATEGORIES.find((c) => c.id === p.category)?.label ?? ''
  const related = [
    ...PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id),
    ...PRODUCTS.filter((x) => x.category !== p.category && x.id !== p.id),
  ].slice(0, 3)

  return (
    <section className="wrap section">
      <Breadcrumb className="crumbs">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/shop' }}>
          Shop
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/shop?category=${p.category}` }}>
          {categoryLabel}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{p.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 g-lg-5">
        <Col lg={6}>
          <div className="pdp__media">
            <ProductArt category={p.category} seed={p.id} image={p.image} alt={p.name} large />
            {p.tag && <span className={`badge badge--${p.tag.replace(' ', '').toLowerCase()}`}>{p.tag}</span>}
          </div>
        </Col>
        <Col lg={6} className="pdp__info">
          <p className="card__cond">
            {p.condition} · {p.brand}
          </p>
          <h1>{p.name}</h1>
          <p className="rating">
            <StarIcon size={15} /> {p.rating.toFixed(1)} <em>({p.reviews} seller reviews)</em>
          </p>
          <div className="pdp__price">
            <strong>{peso(p.price)}</strong>
            {p.was && <s>{peso(p.was)}</s>}
            {p.was && <span className="card__save">{Math.round((1 - p.price / p.was) * 100)}% off</span>}
          </div>
          <p className="card__ship">
            <TruckIcon size={15} /> {p.shipping === 0 ? 'Free shipping' : `+${peso(p.shipping)} shipping`} · Ships from {p.location}
          </p>

          <h2 className="pdp__h">Description</h2>
          <p className="pdp__desc">{p.description}</p>

          <h2 className="pdp__h">Specifications</h2>
          <dl className="specs">
            {p.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="pdp__actions">
            <button className="btn btn--lg" onClick={() => addToCart(p.id)}>
              Add to Cart
            </button>
            <button className={`btn btn--ghost btn--lg${isFav ? ' btn--on' : ''}`} onClick={() => toggleFav(p.id)}>
              <HeartIcon size={18} filled={isFav} /> {isFav ? 'Watching' : 'Watch'}
            </button>
          </div>
          <p className="pdp__trust">
            <ShieldIcon size={16} /> Sold by {p.seller}. Covered by {BRAND.name} Buyer Protection (demo).
          </p>
          <Link className="link" to="/shop">
            ← Back to shop
          </Link>
        </Col>
      </Row>

      <div className="section__head pdp__related">
        <h2>You may also like</h2>
      </div>
      <div className="grid grid--3">
        {related.map((r) => (
          <ProductCard key={r.id} product={r} />
        ))}
      </div>
    </section>
  )
}
