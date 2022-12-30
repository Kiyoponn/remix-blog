import { Form, Link, useLocation } from '@remix-run/react'

import { useOptionalAdminUser, useOptionalUser } from '~/utils'
import { Button, LogOutButton } from './Button'

export default function Navbar({ title }: { title: string }) {
  const currentPath = useLocation().pathname
  const user = useOptionalUser()
  const adminUser = useOptionalAdminUser()

  return (
    <nav className='mx-auto mt-4 max-w-6xl'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-grow items-center justify-between'>
          <Link to='/'>
            <img src='/logo.svg' alt='logo' width={48} height={48} />
          </Link>
          <h1 className='title text-display-md font-extrabold capitalize text-neutral-90'>
            {title}
          </h1>
        </div>
        <div className='flex flex-grow items-center justify-end gap-5'>
          {user ? (
            <>
              {adminUser && currentPath !== '/admin' ? (
                <Button variant='outline' href='/admin'>
                  Admin
                </Button>
              ) : null}
              <Form method='post' action='/logout'>
                <LogOutButton variant='tonal'>Log out</LogOutButton>
              </Form>
            </>
          ) : (
            <>
              {currentPath !== '/login' ? (
                <Button href='/login'>Log in</Button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
