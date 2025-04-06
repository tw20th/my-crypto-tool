// components/ui/Input.tsx
import clsx from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

type Size = 'sm' | 'md' | 'lg'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  size?: Size
}

const sizeClass: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'border rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition',
          sizeClass[size as Size], // ✅ ← 型を明示的に絞る！
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
export default Input
