import clsx from 'clsx'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.Ref<HTMLInputElement>
  label: string
  error?: string
  className?: string
}

export default function Input({
  label,
  error,
  ref,
  className,
  ...props
}: InputFieldProps) {
  return (
    <>
      <label className='block text-accent-5' htmlFor={label.toLocaleLowerCase()}>
        {label}
      </label>
      <input
        ref={ref}
        className={clsx(
          'h-12 rounded-5 border border-accent-2 bg-black px-3 font-medium outline-none w-full',
          'focus:border-accent-5 focus:ring-0',
          'placeholder:text-accent-2',
          'transition-colors duration-150 ease-in-out',
          'focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0',
          className
        )}
        {...props}
      />
    </>
  )
}
