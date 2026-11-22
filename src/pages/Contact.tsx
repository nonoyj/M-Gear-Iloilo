import { useState } from 'react'
import type { FormEvent } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { BRAND, CONTACT } from '../data/site'

const SUBJECTS = ['General inquiry', 'Order & delivery', 'Selling my gear', 'Pick-up at the store', 'Feedback']

export function Contact() {
  const [validated, setValidated] = useState(false)
  const [sent, setSent] = useState<string | null>(null)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setValidated(true)
    if (!form.checkValidity()) return
    const name = (new FormData(form).get('name') as string).split(' ')[0]
    setSent(name)
    setValidated(false)
    form.reset()
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Contact us</p>
          <h1>
            Let's talk <span>gear.</span>
          </h1>
          <p className="page-hero__sub">Questions about an order, a listing or selling your own? Drop by or send us a message.</p>
        </div>
      </section>

      <section className="wrap section">
        <Row className="g-4">
          <Col lg={5}>
            <div className="info">
              <div className="info__item">
                <span className="cat__icon"><PinIcon size={22} /></span>
                <div>
                  <h3>Visit our store</h3>
                  <p>{CONTACT.address.map((l) => <span key={l}>{l}<br /></span>)}</p>
                </div>
              </div>
              <div className="info__item">
                <span className="cat__icon"><PhoneIcon size={22} /></span>
                <div>
                  <h3>Call or text</h3>
                  <p>Landline: {CONTACT.phone}<br />Mobile / Viber: {CONTACT.mobile}</p>
                </div>
              </div>
              <div className="info__item">
                <span className="cat__icon"><MailIcon size={22} /></span>
                <div>
                  <h3>Email</h3>
                  <p>{CONTACT.email}</p>
                </div>
              </div>
              <div className="info__item">
                <span className="cat__icon"><ClockIcon size={22} /></span>
                <div>
                  <h3>Store hours</h3>
                  <p>{CONTACT.hours.map(([d, h]) => <span key={d}>{d}: <b>{h}</b><br /></span>)}</p>
                </div>
              </div>
              <p className="muted small">Contact details are hypothetical, for this demo storefront only.</p>
            </div>
          </Col>

          <Col lg={7}>
            <div className="contact-form">
              <h2>Send us a message</h2>
              {sent && (
                <Alert variant="success" className="mb-3">
                  Salamat, {sent}! Your message was sent to {BRAND.name} (demo, nothing is actually delivered). We'll reply soon.
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={submit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="cf-name">
                      <Form.Label>Full name</Form.Label>
                      <Form.Control name="name" required autoComplete="name" placeholder="Juan Dela Cruz" />
                      <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cf-email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control name="email" type="email" required autoComplete="email" placeholder="juan@email.com" />
                      <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cf-phone">
                      <Form.Label>Mobile number (optional)</Form.Label>
                      <Form.Control name="phone" type="tel" autoComplete="tel" placeholder="0917 123 4567" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cf-subject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Select name="subject" defaultValue={SUBJECTS[0]}>
                        {SUBJECTS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="cf-message">
                      <Form.Label>Message</Form.Label>
                      <Form.Control name="message" as="textarea" rows={5} required minLength={10} placeholder="How can we help?" />
                      <Form.Control.Feedback type="invalid">Please write a message (at least 10 characters).</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button type="submit" className="btn btn--lg">
                      Send message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>

        <div className="map">
          <iframe
            title="Map of Iloilo City"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=122.5444%2C10.6769%2C122.5844%2C10.7169&layer=mapnik&marker=10.6957%2C122.5667"
          />
          <a className="link" href="https://www.openstreetmap.org/?mlat=10.6957&mlon=122.5667#map=15/10.6957/122.5667" target="_blank" rel="noreferrer">
            View larger map
          </a>
        </div>
      </section>
    </>
  )
}
