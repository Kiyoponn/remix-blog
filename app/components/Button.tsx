import { Link } from '@remix-run/react'
import { cva, type VariantProps } from 'class-variance-authority'

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode
  href: string
}

const buttonStyles = cva(
  'flex items-center max-w-full font-medium justify-center border border-transparent transition-all rounded-5 px-3',
  {
    variants: {
      size: {
        small: 'h-8 text-base leading-md',
        medium: 'h-10 text-base leading-md',
        large: 'h-12 text-md leading-lg',
      },
      variant: {
        default: [
          'duration-150 ease-in-out ',
          'hover:bg-black hover:text-white hover:border-white',
        ],
        shadow: [
          'duration-150 ease-in-out translate-x-0',
          'hover:-translate-y-[2px]',
        ],
        ghost: '!bg-black hover:bg-accent',
      },
      type: {
        primary: 'bg-white text-black',
        secondary: [
          '!bg-black text-accent-5 border-accent-3',
          'hover:text-white',
        ],
        error: 'bg-error !text-white',
        warning: 'bg-warning !text-white',
        alert: 'bg-pink !text-white',
        violet: 'bg-violet !text-white',
      },
    },

    compoundVariants: [
      // default
      {
        variant: 'default',
        type: 'error',
        class: 'hover:border-error hover:!text-error',
      },
      {
        variant: 'default',
        type: 'alert',
        class: 'hover:border-pink hover:!text-pink',
      },
      {
        variant: 'default',
        type: 'warning',
        class: 'hover:border-warning hover:!text-warning',
      },
      {
        variant: 'default',
        type: 'violet',
        class: 'hover:border-violet hover:!text-violet',
      },

      // ghost
      {
        variant: 'ghost',
        type: 'primary',
        class: [' !text-white', 'hover:!bg-accent'],
      },
      {
        variant: 'ghost',
        type: 'secondary',
        class: ['!border-transparent ', 'hover:text-accent-5 hover:!bg-accent'],
      },
      {
        variant: 'ghost',
        type: 'error',
        class: [
          '!text-error bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-error',
        ],
      },
      {
        variant: 'ghost',
        type: 'warning',
        class: [
          '!text-warning bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-warning',
        ],
      },
      {
        variant: 'ghost',
        type: 'alert',
        class: [
          '!text-pink bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-pink',
        ],
      },
      {
        variant: 'ghost',
        type: 'violet',
        class: [
          '!text-violet bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-violet',
        ],
      },
    ],

    defaultVariants: {
      size: 'medium',
      variant: 'default',
      type: 'primary',
    },
  }
)

export const Button = ({
  children,
  href,
  size,
  variant,
  type,
  ...prorps
}: ButtonProps) => {
  return (
    <Link to={href} className='w-fit'>
      <button
        type='button'
        className={buttonStyles({ size, variant, type })}
        {...prorps}
      >
        {children}
      </button>
    </Link>
  )
}
