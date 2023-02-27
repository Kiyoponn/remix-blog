import { Form, Link, NavLink } from '@remix-run/react'

import { cn, useOptionalAdminUser, useOptionalUser } from '@/utils'
import { Button } from './Button'

export default function Navbar() {
  const adminUser = useOptionalAdminUser()
  const user = useOptionalUser()

  const hoverEffect = 'px-3 py-2 rounded-5 hover:bg-accent'

  return (
    <nav className='mx-auto h-24 flex max-w-3xl items-center justify-between pt-12'>
      <div className='flex gap-3 items-center'>
        <Link to='/'>
          <img
            className='border rounded border-accent-2 hover:shadow-xl p-1'
            src='/tomilabs.svg'
            alt='tomi'
          />
        </Link>
        {adminUser ? (
          <NavLink
            className={({ isActive }) =>
              cn({ 'font-semibold underline': isActive }, hoverEffect)
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
  )
}
