interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ErrorIcon = ({ ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    data-testid='error-icon'
    fill='none'
    height='20'
    shapeRendering='geometricPrecision'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='20'
    {...props}
  >
    <circle cx='12' cy='12' r='10' fill='none'></circle>
    <path d='M12 8v4'></path>
    <path d='M12 16h.01'></path>
  </svg>
)

const HamburgerIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      data-testid='hamburger-icon'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      viewBox='0 0 32 32'
      height='32'
      width='32'
      className={className}
      {...props}
    >
      <rect className='top' width={24} height={0.25} x={4} y={8} />
      <rect className='center' width={24} height={0.25} x={4} y={16} />
      <rect className='bottom' width={24} height={0.25} x={4} y={24} />
    </svg>
  )
}

export { ErrorIcon, HamburgerIcon }
