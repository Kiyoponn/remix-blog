import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

const buttonStyles = cva(
  [
    'flex items-center font-medium capitalize justify-center border border-transparent transition-all rounded-5 px-3 outline-none',
    'focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0',
  ],
  {
    variants: {
      size: {
        small: 'h-8 text-base leading-md',
        medium: 'h-10 text-base leading-md',
        large: 'h-12 text-md leading-lg',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
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
      shade: {
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
        shade: 'error',
        class: 'hover:border-error hover:!text-error',
      },
      {
        variant: 'default',
        shade: 'alert',
        class: 'hover:border-pink hover:!text-pink',
      },
      {
        variant: 'default',
        shade: 'warning',
        class: 'hover:border-warning hover:!text-warning',
      },
      {
        variant: 'default',
        shade: 'violet',
        class: 'hover:border-violet hover:!text-violet',
      },

      // ghost
      {
        variant: 'ghost',
        shade: 'primary',
        class: [' !text-white', 'hover:!bg-accent'],
      },
      {
        variant: 'ghost',
        shade: 'secondary',
        class: ['!border-transparent ', 'hover:text-accent-5 hover:!bg-accent'],
      },
      {
        variant: 'ghost',
        shade: 'error',
        class: [
          '!text-error bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-error',
        ],
      },
      {
        variant: 'ghost',
        shade: 'warning',
        class: [
          '!text-warning bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-warning',
        ],
      },
      {
        variant: 'ghost',
        shade: 'alert',
        class: [
          '!text-pink bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-pink',
        ],
      },
      {
        variant: 'ghost',
        shade: 'violet',
        class: [
          '!text-violet bg-gradient-to-r from-lighten to-lighten',
          'hover:!bg-violet',
        ],
      },
    ],

    defaultVariants: {
      size: 'medium',
      width: 'fit',
      variant: 'default',
      shade: 'primary',
    },
  }
)

export const Button: React.FC<ButtonProps> = ({
  className,
  size,
  width,
  variant,
  shade,
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonStyles({ size, width, variant, shade }),
        'disabled:!bg-black disabled:!text-accent-3 disabled:!border-accent-2 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
}

export { Button as default, buttonStyles }
