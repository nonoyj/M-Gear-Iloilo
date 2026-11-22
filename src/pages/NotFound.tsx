import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="wrap section">
      <div className="none">
        <h2>Page not found</h2>
        <p>That page doesn't exist, but there's plenty of gear on the home page.</p>
        <Link className="btn" to="/">
          Back to home
        </Link>
      </div>
    </section>
  )
}
