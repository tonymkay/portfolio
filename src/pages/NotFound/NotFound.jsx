import CubeButton from '../../components/ui/CubeButton'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <CubeButton to="/" rounded className={styles.homeBtn}>
          ← Back to Home
        </CubeButton>
      </div>
    </div>
  )
}
