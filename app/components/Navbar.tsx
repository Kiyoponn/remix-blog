import { Form, Link } from '@remix-run/react'

import { useAdminRoute, useOptionalAdminUser, useOptionalUser } from '~/utils'

export default function Navbar({
  title,
  cta
}: {
  title: string
  cta: boolean
}) {
  const user = useOptionalUser()
  const adminUser = useOptionalAdminUser()
  const adminRoute = useAdminRoute()

  return (
    <nav className='mt-8 flex flex-nowrap items-center'>
      <div className='basis-1/4 justify-start'>
        <a href='/'>
          <img src='/logo.svg' alt='logo' width={48} height={48} />
        </a>
      </div>
      <div className='basis-1/2'>
        <h1 className='text-center text-7xl font-bold text-accent-1'>
          {title}
        </h1>
      </div>
      <div className='flex basis-1/4 justify-end'>
        {adminUser ? (
          <Link to='/admin' className={`${adminRoute ? 'hidden' : ''}`}>
            <button className='h-10 w-24 bg-tertiary text-secondary hover:bg-tertiary/90'>
              admin
            </button>
          </Link>
        ) : null}
        {user ? (
          <Form
            className={`${adminRoute ? '' : 'ml-5'}`}
            method='post'
            action='/logout'
          >
            <button
              className={`${
                cta ? '' : 'hidden'
              } float-right h-10 w-24 bg-accent-2 text-secondary hover:bg-accent-2/90`}
            >
              log out
            </button>
          </Form>
        ) : (
          <Link className='float-right' to={'/login'}>
            <button
              className={`${
                cta ? '' : 'hidden'
              } float-right h-10 w-24 bg-primary text-accent-1 hover:bg-primary/90`}
            >
              log in
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}
