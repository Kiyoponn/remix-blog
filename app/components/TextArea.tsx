import { cn } from '@/utils'
import React from 'react'
import { ErrorIcon } from './Icons'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string | null
  className?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className='block text-accent-5'>
        {label}
        <textarea
          ref={ref}
          className={cn(
            'w-full rounded-5 border border-accent-2 bg-black px-3 text-white outline-none',
            'placeholder:text-accent-2',
            'transition-colors duration-150 ease-in-out',
            'focus:border-accent-5 focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0',
            className
          )}
          {...props}
        ></textarea>
        {error && (
          <span className='flex items-center gap-1 py-2 text-error'>
            <ErrorIcon />
            <span className='font-light'>{error}.</span>
          </span>
        )}
      </label>
    )
  }
)

TextArea.displayName = 'TextArea'
export default TextArea
