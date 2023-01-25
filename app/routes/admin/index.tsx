import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { requireAdminUser } from '~/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request)
  return json({})
}

export default function Admin() {
  return (
    <main className='w-full'>
      <h1 className='text-center'>
        Select a blog on left to edit or create a new one.
      </h1>
    </main>
  )
}
