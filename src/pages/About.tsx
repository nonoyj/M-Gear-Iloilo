import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GuitarIcon, ShieldIcon, TagIcon } from '../components/Icons'
import { TeamAvatar } from '../components/TeamAvatar'
import { BRAND, STORY } from '../data/site'
import { TEAM } from '../data/team'

const VALUES = [
  { Icon: TagIcon, title: 'Fair prices', text: 'Honest listings from real players, with the condition and flaws spelled out.' },
  { Icon: ShieldIcon, title: 'Buy with confidence', text: 'Pay with GCash, Maya, card or cash on delivery, and enjoy easy 7-day returns.' },
  { Icon: GuitarIcon, title: 'Made for Ilonggos', text: 'Local sellers, local delivery and free pick-up in Iloilo City.' },
]

export function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About us</p>
          <h1>
            Made in Iloilo, for <span>music makers.</span>
          </h1>
          <p className="page-hero__sub">The people and the story behind {BRAND.name}.</p>
        </div>
      </section>

      <section className="wrap section">
        <Row className="g-4 align-items-center">
          <Col lg={7}>
            <div className="section__head">
              <h2>Our story</h2>
            </div>
            {STORY.map((para) => (
              <p className="about__story" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
          </Col>
          <Col lg={5}>
            <div className="about__quote">
              <p>“Great music starts with the right gear, and the right gear should be easy to find in our own city.”</p>
              <span>The {BRAND.name} team</span>
            </div>
          </Col>
        </Row>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>Meet the team</h2>
        </div>
        <Row xs={1} md={3} className="g-4">
          {TEAM.map((m) => (
            <Col key={m.name}>
              <article className="member">
                <TeamAvatar member={m} className="avatar--xl" />
                <h3>{m.name}</h3>
                <p className="member__role">Co-founder &amp; Developer</p>
                <p className="member__course">{m.course}</p>
              </article>
            </Col>
          ))}
        </Row>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>What we stand for</h2>
        </div>
        <Row xs={1} md={3} className="g-4">
          {VALUES.map(({ Icon, title, text }) => (
            <Col key={title}>
              <div className="value">
                <span className="cat__icon">
                  <Icon size={28} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Col>
          ))}
        </Row>
        <div className="about__cta">
          <Link className="btn btn--lg" to="/shop">
            Browse the gear
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/contact">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
