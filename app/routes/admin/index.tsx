import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { requireAdminUser } from '@/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request)
  return json({})
}

export default function Admin() {
  return (
    <p className='text-center text-accent-5'>
      Nothing to see here :(
      <em className='block'>
        Select a blog on left to edit or{' '}
        <Link
          to='new'
          className='underline decoration-dotted underline-offset-4 hover:bg-white hover:text-black'
        >
          create
        </Link>{' '}
        a new one.
      </em>
    </p>
  )
}
