import { Link } from '@remix-run/react'

export default function Navbar({
  title,
  cta
}: {
  title: string
  cta: boolean
}) {
  return (
    <nav className='mt-8 flex flex-nowrap items-center'>
      <div className='basis-1/4'>
        <a href='/'>
          <img src='/logo.svg' alt='logo' width={48} height={48} />
        </a>
      </div>
      <div className='basis-1/2'>
        <h1 className='text-center text-7xl font-bold text-accent-1'>
          {title}
        </h1>
      </div>
      <div className='basis-1/4'>
        <Link className='float-right' to={'/login'}>
          <button
            className={`${
              cta ? '' : 'hidden'
            } float-right h-12 w-32 bg-primary text-accent-1 hover:bg-primary/90`}
          >
            log in
          </button>
        </Link>
      </div>
    </nav>
  )
}
