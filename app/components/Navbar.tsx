import { NavLink } from '@remix-run/react'
import clsx from 'clsx'

import { useOptionalAdminUser } from '~/utils'

export default function Navbar() {
  const adminUser = useOptionalAdminUser()

  const hoverEffect = 'px-3 py-2 rounded-[5px] hover:bg-accent'

  return (
    <nav className='mx-auto mt-16 flex max-w-3xl items-center justify-between'>
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
      </div>
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
    </nav>
  )
}
