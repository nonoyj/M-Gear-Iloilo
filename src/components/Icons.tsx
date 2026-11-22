import type { ReactNode } from 'react'
import type { CategoryId } from '../data/products'

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

function Svg({ size = 24, className, strokeWidth = 1.8, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const GuitarIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="16" r="5" />
    <circle cx="8" cy="16" r="1.5" />
    <path d="M11.5 12.5 19 5M17 3l4 4" />
  </Svg>
)
export const KeysIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M7 18v-4M12 18v-4M17 18v-4M5.5 6v6M9.5 6v6M14.5 6v6M18.5 6v6" />
  </Svg>
)
export const DrumIcon = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="9" rx="8" ry="3" />
    <path d="M4 9v7c0 1.7 3.6 3 8 3s8-1.3 8-3V9M3 3l6 5M21 3l-6 5" />
  </Svg>
)
export const PedalIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <circle cx="12" cy="8" r="2" />
    <circle cx="12" cy="16" r="2.5" />
  </Svg>
)
export const AmpIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="12" cy="14" r="3.5" />
    <path d="M6.5 8h.01M10 8h.01M13.5 8h.01M17 8h.01" />
  </Svg>
)
export const MicIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
  </Svg>
)
export const HeadphonesIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    <rect x="3" y="14" width="4" height="7" rx="1.5" />
    <rect x="17" y="14" width="4" height="7" rx="1.5" />
  </Svg>
)
export const SearchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Svg>
)
export const CartIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
  </Svg>
)
export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p}>
    <path
      fill={filled ? 'currentColor' : 'none'}
      d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21.8l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"
    />
  </Svg>
)
export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
)
export const TruckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M1 4h13v12H1zM14 8h4l4 4v4h-8" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Svg>
)
export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)
export const TagIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7" cy="7" r="1.4" />
  </Svg>
)
export const RefreshIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M3 21v-5h5M21 3v5h-5" />
  </Svg>
)
export const StarIcon = (p: IconProps) => (
  <Svg {...p}>
    <path fill="currentColor" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
  </Svg>
)

export const CATEGORY_ICONS: Record<CategoryId, (p: IconProps) => ReactNode> = {
  guitars: GuitarIcon,
  basses: GuitarIcon,
  amps: AmpIcon,
  pedals: PedalIcon,
  keys: KeysIcon,
  drums: DrumIcon,
  studio: HeadphonesIcon,
  mics: MicIcon,
}

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)
export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </Svg>
)
export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </Svg>
)
export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Svg>
)
