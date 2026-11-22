import { useEffect, useRef, useState } from 'react'
import { TEAM } from '../data/team'
import type { TeamMember } from '../data/team'
import './TeamCredit.css'

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z .]/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !w.endsWith('.'))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

function Avatar({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="team__avatar">
      {failed ? initials(member.name) : <img src={member.photo} alt={member.name} onError={() => setFailed(true)} />}
    </span>
  )
}

/** "by <names>" that reveals the development team card on hover, focus or tap. */
export function TeamCredit() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open])

  return (
    <span className="team" ref={ref} onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)} onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}>
      <button
        type="button"
        className="team__trigger"
        aria-expanded={open}
        aria-controls="team-card"
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      >
        by {TEAM.map((m) => m.name).join(' - ')}
      </button>
      {open && (
        <span className="team__pop" id="team-card" role="dialog" aria-label="Development team">
          <span className="team__card">
            <span className="team__title">Development Team</span>
            {TEAM.map((m) => (
              <span className="team__member" key={m.name}>
                <Avatar member={m} />
                <span className="team__who">
                  <b>{m.name}</b>
                  <small>{m.course}</small>
                </span>
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  )
}
