import { NavLink } from '@remix-run/react'
import clsx from 'clsx'

import { useOptionalAdminUser } from '~/utils'

export default function Navbar() {
  const adminUser = useOptionalAdminUser()

  return (
    <nav className='mx-auto mt-16 flex max-w-3xl gap-4'>
      <NavLink
        className={({ isActive }) => clsx({ 'font-bold': isActive })}
        to='/'
      >
        Blogs
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx({ 'font-bold': isActive })}
        to='/about'
      >
        About
      </NavLink>
      {adminUser ? (
        <NavLink
          className={({ isActive }) => clsx({ 'font-bold': isActive })}
          to='/admin'
        >
          Admin
        </NavLink>
      ) : null}
    </nav>
  )
}
