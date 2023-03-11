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

export { ErrorIcon }
