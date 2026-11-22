import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CATEGORY_ICONS, RefreshIcon, ShieldIcon, StarIcon, TagIcon, TruckIcon } from '../components/Icons'
import { ProductArt } from '../components/ProductArt'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/storeContext'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { peso } from '../lib/format'

const FEATURED_ID = 2

export function Home() {
  const { addToCart } = useStore()
  const featured = PRODUCTS.find((p) => p.id === FEATURED_ID) ?? PRODUCTS[0]
  const deals = PRODUCTS.filter((p) => p.was).slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="wrap hero__row">
          <div className="hero__copy">
            <p className="eyebrow">Iloilo City's marketplace for music makers</p>
            <h1>
              Find your next <span>sound.</span>
            </h1>
            <p className="hero__sub">
              Guitars, synths, pedals, drums and studio gear from Ilonggo sellers in Jaro, Molo, Mandurriao and all over Iloilo. Pang-gig, pang-studio, pang-jam: buy it, plug it in, make noise.
            </p>
            <div className="hero__cta">
              <Link className="btn btn--white btn--lg" to="/shop">
                Shop all gear
              </Link>
              <Link className="btn btn--outline btn--lg" to={`/product/${featured.id}`}>
                See featured pick
              </Link>
            </div>
          </div>
          <div className="hero__stack" aria-hidden="true">
            {PRODUCTS.filter((p) => [2, 8, 6].includes(p.id)).map((p, i) => {
              const Icon = CATEGORY_ICONS[p.category]
              return (
                <div key={p.id} className={`float float--${i}`}>
                  <Icon size={64} strokeWidth={1.4} />
                  <strong>{peso(p.price)}</strong>
                  <span>{p.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="wrap perks">
        <div><TruckIcon size={22} /><p><b>Iloilo delivery</b> &amp; free store pick-up</p></div>
        <div><ShieldIcon size={22} /><p><b>GCash, Maya &amp; COD</b> pay your way</p></div>
        <div><RefreshIcon size={22} /><p><b>7-day</b> easy returns</p></div>
        <div><TagIcon size={22} /><p><b>Fair prices</b> from Ilonggo players</p></div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>
            Featured product <span className="pill">Staff pick</span>
          </h2>
        </div>
        <Row className="featured g-0 align-items-stretch">
          <Col md={6}>
            <Link to={`/product/${featured.id}`} className="featured__media" aria-label={`View ${featured.name}`}>
              <ProductArt category={featured.category} seed={featured.id} image={featured.image} alt={featured.name} large />
            </Link>
          </Col>
          <Col md={6} className="featured__body">
            <p className="card__cond">
              {featured.condition} · {featured.brand}
            </p>
            <h3>{featured.name}</h3>
            <p className="rating">
              <StarIcon size={15} /> {featured.rating.toFixed(1)} <em>({featured.reviews} seller reviews)</em>
            </p>
            <p className="featured__desc">{featured.description}</p>
            <div className="pdp__price">
              <strong>{peso(featured.price)}</strong>
              {featured.was && <s>{peso(featured.was)}</s>}
            </div>
            <div className="featured__actions">
              <Link className="btn btn--lg" to={`/product/${featured.id}`}>
                View product
              </Link>
              <button className="btn btn--ghost btn--lg" onClick={() => addToCart(featured.id)}>
                Add to cart
              </button>
            </div>
          </Col>
        </Row>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>Shop by category</h2>
        </div>
        <div className="cats">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.id]
            return (
              <Link key={c.id} className="cat" to={`/shop?category=${c.id}`}>
                <span className="cat__icon"><Icon size={30} /></span>
                {c.label}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>
            Hot deals <span className="pill">Price drops</span>
          </h2>
          <Link className="link" to="/shop">
            See all gear →
          </Link>
        </div>
        <div className="grid grid--4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="sell">
          <div>
            <h2>May gear na naka-tambak?</h2>
            <p>List it in minutes and put it in the hands of a fellow musician who'll play it.</p>
          </div>
          <Link className="btn btn--white btn--lg" to="/contact">
            Start selling
          </Link>
        </div>
      </section>
    </>
  )
}
