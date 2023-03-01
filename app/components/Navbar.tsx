import { Form, Link, NavLink } from '@remix-run/react'

import { cn, useOptionalAdminUser, useOptionalUser } from '@/utils'
import { Button } from './Button'

export default function Navbar() {
  const adminUser = useOptionalAdminUser()
  const user = useOptionalUser()

  const hoverClass = 'px-3 py-2 rounded-5 hover:bg-accent'

  return (
    <header className='mx-4 h-24 pt-12 xs:mx-6 md:mx-auto md:max-w-3xl'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link to='/'>
            <img
              className='rounded border border-accent-2 p-1'
              src='/tomistudio.svg'
              alt='tomistudio'
            />
          </Link>
          {adminUser ? (
            <NavLink
              className={({ isActive }) =>
                cn({ 'font-semibold underline': isActive }, hoverClass)
              }
              to='/admin'
            >
              Admin
            </NavLink>
          ) : null}
        </div>
        {user ? (
          <Form action='/logout' method='post'>
            <Button type='submit' variant='ghost' shade='error'>
              Logout
            </Button>
          </Form>
        ) : null}
      </nav>
    </header>
  )
}
