// components/ui/Select.tsx
import clsx from 'clsx'
import { SelectHTMLAttributes, forwardRef } from 'react'

type Size = 'sm' | 'md' | 'lg'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  size?: Size
}

const sizeClass: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ size = 'md', className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          'border rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition',
          sizeClass[size as Size],
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'
export default Select
