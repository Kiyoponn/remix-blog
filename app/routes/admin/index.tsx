import { json, LoaderArgs } from '@remix-run/node'
import Navbar from '~/components/Navbar'
import { requireAdminUser } from '~/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request)
  return json({})
}

export default function Admin() {
  return (
    <>
      <Navbar title={'blog admin'} cta={true} />
      <div>
        <h1>Admin</h1>
      </div>
    </>
  )
}
