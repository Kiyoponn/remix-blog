const ErrorIcon = () => {
  return (
    <svg
      data-testid='geist-icon'
      fill='none'
      height='20'
      shape-rendering='geometricPrecision'
      stroke='currentColor'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      viewBox='0 0 24 24'
      width='20'
    >
      <circle cx='12' cy='12' r='10' fill='var(--geist-fill)'></circle>
      <path d='M12 8v4' stroke='var(--geist-stroke)'></path>
      <path d='M12 16h.01' stroke='var(--geist-stroke)'></path>
    </svg>
  )
}

export { ErrorIcon }
