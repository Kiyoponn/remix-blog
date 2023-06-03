interface IconProps extends React.SVGProps<SVGSVGElement> { }

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

const SidebarCollaspe = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      data-testid='sidebar-expand'
      fill='none'
      stroke='currentColor'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      className={className}
      {...props}
    >
      <path fill="currentColor" d="M6.823 7.823a.25.25 0 0 1 0 .354l-2.396 2.396A.25.25 0 0 1 4 10.396V5.604a.25.25 0 0 1 .427-.177Z"></path>
      <path fill="currentColor" d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25H9.5v-13H1.75a.25.25 0 0 0-.25.25ZM11 14.5h3.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H11Z"></path>
    </svg>
  )
}

const SidebarExpand = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      data-testid='sidebar-expand'
      fill='none'
      stroke='currentColor'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      className={className}
      {...props}
    >
      <path fill="currentColor" d="m4.177 7.823l2.396-2.396A.25.25 0 0 1 7 5.604v4.792a.25.25 0 0 1-.427.177L4.177 8.177a.25.25 0 0 1 0-.354Z"></path>
      <path fill="currentColor" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25H9.5v-13Zm12.5 13a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H11v13Z"></path>
    </svg>
  )
}

export { ErrorIcon, HamburgerIcon, SidebarCollaspe, SidebarExpand }
