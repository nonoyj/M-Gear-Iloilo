import { useState } from 'react'
import type { CategoryId } from '../data/products'
import { CATEGORY_ICONS } from './Icons'

const GRADIENTS = [
  'linear-gradient(135deg,#ff3d00 0%,#ff9100 100%)',
  'linear-gradient(135deg,#ff5200 0%,#ffb300 100%)',
  'linear-gradient(135deg,#ff2d00 0%,#ff7a00 100%)',
  'linear-gradient(135deg,#ff6a00 0%,#ffc21a 100%)',
]

interface Props {
  category: CategoryId
  seed: number
  image?: string
  alt?: string
  large?: boolean
}

export function ProductArt({ category, seed, image, alt = '', large }: Props) {
  const Icon = CATEGORY_ICONS[category]
  const [failed, setFailed] = useState(false)

  if (image && !failed) {
    return (
      <div className={`art art--photo${large ? ' art--large' : ''}`}>
        <img src={image} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      </div>
    )
  }

  return (
    <div className={`art${large ? ' art--large' : ''}`} style={{ background: GRADIENTS[seed % GRADIENTS.length] }}>
      <span className="art__ring art__ring--a" />
      <span className="art__ring art__ring--b" />
      <Icon size={large ? 150 : 84} strokeWidth={1.3} />
    </div>
  )
}
