const ErrorIcon = () => (
  <svg
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
  >
    <circle cx='12' cy='12' r='10' fill='none'></circle>
    <path d='M12 8v4' stroke='red'></path>
    <path d='M12 16h.01' stroke='red'></path>
  </svg>
)

export { ErrorIcon }
