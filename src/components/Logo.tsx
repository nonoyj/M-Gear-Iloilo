import { Link } from 'react-router-dom'
import { BRAND } from '../data/site'

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link className={`logo${light ? ' logo--light' : ''}`} to="/" aria-label={`${BRAND.name} home`}>
      <span className="logo__mark">{BRAND.mark}</span>
      <span>
        {BRAND.first} <b>{BRAND.second}</b>
      </span>
    </Link>
  )
}
