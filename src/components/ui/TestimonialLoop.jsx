/**
 * TestimonialLoop.jsx
 *
 * Vertical, gap-free infinite loop of testimonial cards. The list is
 * rendered twice inside one track that translates 0 → -50%, so the
 * second copy lands exactly where the first began. Hovering (or
 * focusing inside) pauses the scroll. The duplicate set is aria-hidden.
 */
import styles from './TestimonialLoop.module.css'

const SECONDS_PER_CARD = 9

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Card({ item }) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.quote}>{item.quote}</blockquote>
      <figcaption className={styles.author}>
        <span className={styles.avatar}>
          {item.avatar ? <img src={item.avatar} alt="" /> : initials(item.name)}
        </span>
        <span>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.role}>
            {item.role}, {item.company}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function TestimonialLoop({ items }) {
  return (
    <div className={styles.viewport} tabIndex={0} aria-label="Testimonials">
      <div
        className={styles.track}
        style={{ '--loop-duration': `${items.length * SECONDS_PER_CARD}s` }}
      >
        <div className={styles.set}>
          {items.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </div>
        <div className={styles.set} aria-hidden="true">
          {items.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
