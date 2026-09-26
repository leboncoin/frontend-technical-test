import styles from './avatar.module.css'

/**
 * Initial-based avatar with a deterministic color per nickname.
 * Decorative: the user's name is always rendered as text next to it.
 */
const PALETTE = [
  '#2e86ab',
  '#6a4c93',
  '#b5179e',
  '#0f7b6c',
  '#b85c38',
  '#4361ee',
  '#7209b7',
  '#8d6a2f',
]

function colorFor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  return PALETTE[hash % PALETTE.length]
}

interface AvatarProps {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'
  return (
    <span
      className={styles.avatar}
      style={{ backgroundColor: colorFor(name) }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}
