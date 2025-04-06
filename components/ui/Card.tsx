// components/ui/Card.tsx
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'ghost'
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const paddingMap = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}: Props) {
  const base = 'rounded-xl text-gray-900 dark:text-gray-100 transition'

  const variantStyle = {
    default: 'bg-white dark:bg-gray-800 shadow',
    outlined:
      'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    ghost: 'bg-transparent shadow-none',
  }

  return (
    <div
      className={clsx(
        base,
        variantStyle[variant],
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
