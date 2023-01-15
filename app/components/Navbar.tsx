import { NavLink } from '@remix-run/react'
import clsx from 'clsx'

import { useOptionalAdminUser } from '~/utils'

export default function Navbar() {
  const adminUser = useOptionalAdminUser()

  return (
    <nav className='mx-auto mt-16 max-w-3xl'>
      <ul className='flex gap-4 transition-all delay-500 ease-out'>
        <NavLink
          className={({ isActive }) => clsx({ 'font-bold': isActive })}
          to='/'
        >
          <li className='rounded-lg p-2 hover:bg-accent'>Blogs</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx({ 'font-bold': isActive })}
          to='/about'
        >
          <li className='rounded-lg px-3 py-2 hover:bg-accent'>About</li>
        </NavLink>
        {adminUser ? (
          <NavLink
            className={({ isActive }) => clsx({ 'font-bold': isActive })}
            to='/'
          >
            <li className='rounded-lg px-3 py-2 hover:bg-accent'>Admin</li>
          </NavLink>
        ) : null}
      </ul>
    </nav>
  )
}
