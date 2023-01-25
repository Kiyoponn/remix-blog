import { Form, NavLink } from '@remix-run/react'
import clsx from 'clsx'

import { useOptionalAdminUser, useOptionalUser } from '~/utils'
import { Button } from './Button'

export default function Navbar() {
  const adminUser = useOptionalAdminUser()
  const user = useOptionalUser()

  const hoverEffect = 'px-3 py-2 rounded-5 hover:bg-accent'

  return (
    <nav className='mx-auto flex max-w-3xl items-center justify-between pt-12'>
      <div className='flex gap-3'>
        <NavLink
          className={({ isActive }) =>
            clsx({ 'font-bold': isActive }, hoverEffect)
          }
          to='/'
        >
          Blogs
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx({ 'font-bold': isActive }, hoverEffect)
          }
          to='/about'
        >
          About
        </NavLink>
        {adminUser ? (
          <NavLink
            className={({ isActive }) =>
              clsx({ 'font-bold': isActive }, hoverEffect)
            }
            to='/admin'
          >
            Admin
          </NavLink>
        ) : null}
      </div>
      {user ? (
        <Form action='/logout' method='post'>
          <Button variant='ghost' color='error'>Logout</Button>
        </Form>
      ) : null}
    </nav>
  )
}
