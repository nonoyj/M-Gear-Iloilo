import { useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CartDrawer } from './CartDrawer'
import { Checkout } from './Checkout'
import { CartIcon, SearchIcon } from './Icons'
import { Logo } from './Logo'
import { TeamCredit } from './TeamCredit'
import { useStore } from '../context/storeContext'
import { BRAND } from '../data/site'
import { CATEGORIES } from '../data/products'

export function Layout() {
  const s = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Every page change starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <div className="announce">
        <span>⚡ Maayong adlaw, Iloilo! Free delivery over ₱25,000 · Free pick-up in Iloilo City · Demo storefront</span>
      </div>

      <header className="header">
        <Navbar expand="md" collapseOnSelect>
          <div className="wrap header__row">
            <Logo />
            <form
              className="search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                navigate('/shop')
              }}
            >
              <SearchIcon size={18} />
              <input
                value={s.query}
                onChange={(e) => s.setQuery(e.target.value)}
                placeholder="Search guitars, synths, pedals, mics…"
                aria-label="Search gear"
              />
            </form>
            <button className="cart-btn" onClick={s.openCart} aria-label={`Open cart, ${s.cartCount} items`}>
              <CartIcon size={22} />
              <span>Cart</span>
              {s.cartCount > 0 && <i>{s.cartCount}</i>}
            </button>
            <Navbar.Toggle aria-controls="main-menu" aria-label="Toggle menu" />
          </div>
          <div className="wrap">
            <Navbar.Collapse id="main-menu">
              <Nav className="mainnav" as="nav" aria-label="Main menu">
                <Nav.Link as={NavLink} eventKey="home" to="/" end>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} eventKey="shop" to="/shop">
                  Shop
                </Nav.Link>
                <Nav.Link as={NavLink} eventKey="about" to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} eventKey="contact" to="/contact">
                  Contact Us
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>

      <main id="top">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="wrap footer__row">
          <div>
            <Logo light />
            <p>A demo music gear marketplace based in Iloilo City, Western Visayas, Philippines. All brands, sellers and listings are fictional.</p>
          </div>
          <div>
            <h4>Shop</h4>
            {CATEGORIES.slice(0, 4).map((c) => (
              <Link key={c.id} to={`/shop?category=${c.id}`}>
                {c.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <form
            className="news"
            onSubmit={(e) => {
              e.preventDefault()
              s.flash('Thanks for subscribing (demo)')
              e.currentTarget.reset()
            }}
          >
            <h4>Get weekly price drops (Salamat!)</h4>
            <div>
              <input type="email" required placeholder="you@email.com" aria-label="Email address" />
              <button className="btn btn--sm">Join</button>
            </div>
          </form>
        </div>
        <p className="copy">
          © 2026 {BRAND.name} · Iloilo City, Philippines · <TeamCredit />
        </p>
      </footer>

      {s.cartOpen && (
        <CartDrawer
          lines={s.lines}
          onClose={s.closeCart}
          onQty={s.changeQty}
          onRemove={s.removeLine}
          onCheckout={() => {
            s.closeCart()
            s.openCheckout()
          }}
        />
      )}
      {s.checkoutOpen && <Checkout lines={s.lines} onClose={s.closeCheckout} onPlaced={s.clearCart} />}
      {s.toast && (
        <div className="toast" role="status">
          {s.toast}
        </div>
      )}
    </>
  )
}
