import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/utils'

const buttonStyles = tv({
  base: [
    'flex items-center font-medium capitalize justify-center border border-transparent transition-all rounded-5 px-3 outline-none',
    'focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:border-accent-2 disabled:bg-black disabled:text-accent-3 disabled:hover:bg-black disabled:hover:text-accent-3 disabled:hover:border-accent-2',
  ],

  variants: {
    size: {
      sm: 'h-8 text-base leading-md',
      md: 'h-10 text-base leading-md',
      lg: 'h-12 text-md leading-lg',
    },
    width: {
      fit: 'w-fit',
      full: 'w-full',
    },
    intent: {
      default: [
        'duration-150 ease-in-out ',
        'hover:bg-black hover:text-white hover:border-white',
      ],
      shadow: [
        'duration-150 ease-in-out translate-x-0',
        'hover:-translate-y-[2px]',
      ],
      ghost: 'bg-black hover:bg-accent',
    },
    shades: {
      primary: 'bg-white text-black',
      secondary: ['bg-black text-accent-5 border-accent-3', 'hover:text-white'],
      error: 'bg-error text-white',
      warning: 'bg-warning text-white',
      alert: 'bg-pink text-white',
      violet: 'bg-violet text-white',
    },
  },

  compoundVariants: [
    // default
    {
      intent: 'default',
      shades: 'error',
      class: 'hover:border-error hover:text-error',
    },
    {
      intent: 'default',
      shades: 'alert',
      class: 'hover:border-pink hover:text-pink',
    },
    {
      intent: 'default',
      shades: 'warning',
      class: 'hover:border-warning hover:text-warning',
    },
    {
      intent: 'default',
      shades: 'violet',
      class: 'hover:border-violet hover:text-violet',
    },

    // ghost
    {
      intent: 'ghost',
      shades: 'primary',
      class: ['bg-lighten text-white', 'hover:bg-accent'],
    },
    {
      intent: 'ghost',
      shades: 'secondary',
      class: ['border-transparent ', 'hover:text-accent-5 hover:bg-accent'],
    },
    {
      intent: 'ghost',
      shades: 'error',
      class: ['text-error bg-lighten', 'hover:bg-error/25'],
    },
    {
      intent: 'ghost',
      shades: 'warning',
      class: ['text-warning bg-lighten', 'hover:bg-warning/25'],
    },
    {
      intent: 'ghost',
      shades: 'alert',
      class: ['text-pink bg-lighten', 'hover:bg-pink/25'],
    },
    {
      intent: 'ghost',
      shades: 'violet',
      class: ['text-violet bg-lighten', 'hover:bg-violet/25'],
    },
  ],

  defaultVariants: {
    size: 'md',
    width: 'fit',
    intent: 'default',
    shades: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLElement>,
    ButtonVariants {}

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  width,
  shades,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(buttonStyles({ intent, shades, size, width }), className)}
      {...props}
    />
  )
}

export { Button as default, buttonStyles }
