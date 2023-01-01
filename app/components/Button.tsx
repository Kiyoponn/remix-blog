import { Link } from '@remix-run/react'
import { cva, type VariantProps } from 'class-variance-authority'

interface ButtonProps extends VariantProps<typeof buttonClasses> {
  children: React.ReactNode
  href: string
}

const buttonClasses = cva(
  [
    'px-6 h-10 rounded text-center flex items-center outline-none text-label-lg font-medium uppercase',
    'disabled:text-opacity-content disabled:bg-opacity-container disabled:bg-on-surface disabled:text-on-surface disabled:shadow-none',
  ],
  {
    variants: {
      variant: {
        text: [],
        outline: [],
        tonal: [
          'bg-secondary-container text-on-secondary-container',
          'hover:bg-on-secondary-container hover:bg-opacity-hovered hover:shadow-elvation-1 hover:text-on-secondary-container',
        ],
        filled: [
          'bg-primary text-on-primary',
          'hover:bg-primary hover:shadow-elvation-1',
          'focus:bg-on-primary focus:bg-opacity-focused focus:shadow-elvation-0',
        ],
        elevated: [
          'bg-surface shadow-elvation-1 text-primary',
          'hover:shadow-elvation-2 hover:bg-primary hover:bg-opacity-hovered',
          'focus:bg-primary focus:bg-opacity-focused',
          'active:bg-opacity-pressed active:bg-primary',
        ],
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

export const classTest = () => {
  return (
    <>
      <button className=''>Test</button>
    </>
  )
}

export const Button = ({ children, href, variant }: ButtonProps) => {
  return (
    <Link to={href} className={buttonClasses({ variant })}>
      {children}
    </Link>
    // <button disabled className={buttonClasses({ variant })}>{ children }</button>
  )
}

export const LogOutButton = ({
  children,
  variant,
}: Pick<ButtonProps, 'children' | 'variant'>) => {
  return (
    <button
      className={`${buttonClasses({ variant })}
      }`}
    >
      {children}
    </button>
  )
}
