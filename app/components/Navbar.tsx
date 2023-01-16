import { NavLink } from '@remix-run/react'
import clsx from 'clsx'

import { useOptionalAdminUser } from '~/utils'

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li
    className={clsx(
      'rounded-lg px-3 py-2 transition-colors ease-out',
      'hover:bg-accent',
    )}
  >
    {children}
  </li>
)

export default function Navbar() {
  const adminUser = useOptionalAdminUser()

  return (
    <nav className='mx-auto mt-16 max-w-3xl'>
      <ul className='flex gap-4'>
        <NavLink
          className={({ isActive }) => clsx({ 'font-bold': isActive })}
          to='/'
        >
          <ListItem>Blogs</ListItem>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx({ 'font-bold': isActive })}
          to='/about'
        >
          <ListItem>About</ListItem>
        </NavLink>
        {adminUser ? (
          <NavLink
            className={({ isActive }) => clsx({ 'font-bold': isActive })}
            to='/admin'
          >
            <ListItem>Admin</ListItem>
          </NavLink>
        ) : null}
      </ul>
    </nav>
  )
}
