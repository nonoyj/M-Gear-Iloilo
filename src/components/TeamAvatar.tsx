import { useState } from 'react'
import type { TeamMember } from '../data/team'

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z .]/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !w.endsWith('.'))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/** Member photo (public/team/…) with an initials fallback when the photo is missing. */
export function TeamAvatar({ member, className = '' }: { member: TeamMember; className?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className={`avatar ${className}`}>
      {failed ? initials(member.name) : <img src={member.photo} alt={member.name} onError={() => setFailed(true)} />}
    </span>
  )
}
