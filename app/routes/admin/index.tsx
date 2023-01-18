import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { requireAdminUser } from '~/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request)
  return json({})
}

export default function Admin() {
  return (
    <div>
      <h1 className='text-center text-xl text-accent-2 text-opacity-70'>
        Select a blog on left to edit or create a new one.
      </h1>
    </div>
  )
}
