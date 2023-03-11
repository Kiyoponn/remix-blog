import { cn } from '@/utils'
import React from 'react'
import { ErrorIcon } from './Icons'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className='block text-accent-5'>
        {label}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-5 border border-accent-2 bg-black px-3 text-white outline-none',
            'placeholder:text-accent-2',
            'transition-colors duration-150 ease-in-out',
            'focus:border-accent-5 focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0',
            className
          )}
          {...props}
        />
        {error && (
          <span className='flex items-center gap-1 py-2 text-error'>
            <ErrorIcon className='stroke-error' />
            <span className='font-light'>{error}.</span>
          </span>
        )}
      </label>
    )
  }
)

Input.displayName = 'Input'
export default Input
