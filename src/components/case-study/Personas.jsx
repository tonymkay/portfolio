import { ArrowRight, Check, Quote } from 'lucide-react'
import styles from './Personas.module.css'

/**
 * Personas — the audiences a project was designed for.
 * Each persona gets its own card design (data.personas[i].layout) so the set
 * feels uniform in tone but never repeats one template.
 *
 * data: { title, intro, personas: [{ id, number, layout, group, who, quote, needs[] }] }
 * layout: 'feature' | 'dark' | 'list' | 'checks' | 'wide'
 */

function Heading({ number, group }) {
  return (
    <div className={styles.heading}>
      <span className={styles.num}>{number}</span>
      <h3 className={styles.group}>{group}</h3>
    </div>
  )
}

function NeedsLabel() {
  return <h4 className={styles.needsLabel}>Needs</h4>
}

function ArrowList({ needs }) {
  return (
    <ul className={styles.arrowList}>
      {needs.map((need) => (
        <li key={need}>
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          <span>{need}</span>
        </li>
      ))}
    </ul>
  )
}

function CheckList({ needs }) {
  return (
    <ul className={styles.checkList}>
      {needs.map((need) => (
        <li key={need}>
          <span className={styles.check} aria-hidden="true">
            <Check size={14} strokeWidth={2.5} />
          </span>
          <span>{need}</span>
        </li>
      ))}
    </ul>
  )
}

function Chips({ needs }) {
  return (
    <ul className={styles.chips}>
      {needs.map((need) => (
        <li key={need}>{need}</li>
      ))}
    </ul>
  )
}

function QuoteIcon() {
  return (
    <span className={styles.quoteIcon} aria-hidden="true">
      <Quote size={16} fill="currentColor" strokeWidth={0} />
    </span>
  )
}

function Persona({ persona }) {
  const { layout, number, group, who, quote, needs } = persona

  if (layout === 'feature') {
    return (
      <article className={`${styles.card} ${styles.feature}`}>
        <Heading number={number} group={group} />
        <p className={styles.who}>{who}</p>
        <div className={styles.quotePill}>
          <QuoteIcon />
          <p>{quote}</p>
        </div>
        <div className={styles.needsBlock}>
          <NeedsLabel />
          <ArrowList needs={needs} />
        </div>
      </article>
    )
  }

  if (layout === 'dark') {
    return (
      <article className={`${styles.card} ${styles.dark}`}>
        <Heading number={number} group={group} />
        <p className={styles.who}>{who}</p>
        <blockquote className={styles.bigQuote}>
          <QuoteIcon />
          <p>{quote}</p>
        </blockquote>
        <div className={styles.needsBlock}>
          <NeedsLabel />
          <Chips needs={needs} />
        </div>
      </article>
    )
  }

  if (layout === 'list') {
    return (
      <article className={`${styles.card} ${styles.list}`}>
        <Heading number={number} group={group} />
        <p className={styles.who}>{who}</p>
        <div className={styles.needsBlock}>
          <NeedsLabel />
          <ArrowList needs={needs} />
        </div>
        <blockquote className={styles.quoteBox}>{quote}</blockquote>
      </article>
    )
  }

  if (layout === 'checks') {
    return (
      <article className={`${styles.card} ${styles.checks}`}>
        <div className={styles.quoteBand}>
          <QuoteIcon />
          <p>{quote}</p>
        </div>
        <Heading number={number} group={group} />
        <p className={styles.who}>{who}</p>
        <div className={styles.needsBlock}>
          <NeedsLabel />
          <CheckList needs={needs} />
        </div>
      </article>
    )
  }

  return (
    <article className={`${styles.card} ${styles.wide}`}>
      <div className={styles.wideIntro}>
        <Heading number={number} group={group} />
        <p className={styles.who}>{who}</p>
      </div>
      <blockquote className={styles.wideQuote}>
        <QuoteIcon />
        <p>{quote}</p>
      </blockquote>
      <div className={styles.needsBlock}>
        <NeedsLabel />
        <Chips needs={needs} />
      </div>
    </article>
  )
}

export default function Personas({ data }) {
  return (
    <div className={styles.root}>
      <header className={styles.head}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.intro}>{data.intro}</p>
      </header>

      <div className={styles.grid}>
        {data.personas.map((persona) => (
          <Persona key={persona.id} persona={persona} />
        ))}
      </div>
    </div>
  )
}
