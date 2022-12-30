import { Link } from '@remix-run/react';
import { cva, type VariantProps } from 'class-variance-authority';

interface ButtonProps extends VariantProps<typeof buttonClasses> {
  children: React.ReactNode
  href: string
}

const buttonClasses = cva(
  'px-6 py-[0.625rem] rounded-full text-label-lg outline-none uppercase font-medium transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        filled: [
          'text-primary-20 bg-primary-80',
          'hover:bg-primary-80/90',
          'focus:bg-primary-90/90 focus:ring focus:ring-2 focus:ring-primary-80 focus:ring-opacity-25',
        ],
        outline: [
          'text-primary-80 border border-neutral-variant-60',
          'hover:bg-primary-20/90',
          'focus:bg-primary-30/90 focus:ring focus:ring-2 focus:ring-primary-20 focus:ring-opacity-80',
        ],
        text: ['text-primary-80 bg-neutral-10 ', 'hover:bg-primary-20'],
        tonal: [
          'text-secondary-70 bg-secondary-30',
          'hover:bg-secondary-30/90',
          'focus:bg-secondary-40/90 focus:ring focus:ring-2 focus:ring-secondary-30 focus:ring-opacity-25',
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
    <Link className={buttonClasses({ variant })} to={href}>
      {children}
    </Link>
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
