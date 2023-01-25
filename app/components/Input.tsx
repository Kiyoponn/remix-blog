import clsx from 'clsx'
import { ErrorIcon } from './Icons'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
  label: string
  error?: string | null
  className?: string
}

export default function Input({
  label,
  error,
  ref,
  className,
  ...props
}: InputProps) {
  return (
    <label className='block text-accent-5'>
      {label}
      <input
        ref={ref}
        className={clsx(
          'h-12 w-full rounded-5 border border-accent-2 bg-black px-3 font-medium text-white outline-none',
          'placeholder:text-accent-2',
          'transition-colors duration-150 ease-in-out',
          'focus:border-accent-5 focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0',
          className
        )}
        {...props}
      />
      {error && (
        <span className='text-error flex gap-1 items-center py-2'>
          <ErrorIcon />
          <span className='font-light'>{error}.</span>
        </span>
      )}
    </label>
  )
}
