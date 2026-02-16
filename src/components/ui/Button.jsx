/* Button component */
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/**
 * Button / Link component
 * @param {string} variant - 'primary' | 'outline' | 'ghost' | 'dark'
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {string} href    - if provided, renders as <Link>
 * @param {boolean} external - if true + href, renders <a> with target="_blank"
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  if (href && external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link to={href} className={cls} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
