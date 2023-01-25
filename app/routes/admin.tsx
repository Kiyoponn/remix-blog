import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'
import Page from '~/components/Page'
import { getBlogListItems } from '~/models/blog.server'

export const loader = async () => {
  const blogs = await getBlogListItems()
  return { blogs }
}

export default function AdminPage() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <Page className='mt-12 flex items-start justify-between'>
      <nav>
        <Link to={'/admin'}>
          <h1 className=''>All Blogs</h1>
        </Link>
        <div>
          <ul className='w-32'>
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <NavLink
                  className={({ isActive }) =>
                    'hover:underline' +
                    ' ' +
                    (isActive
                      ? 'text-opacity-100 underline'
                      : 'text-opacity-70')
                  }
                  prefetch='intent'
                  to={blog.slug}
                >
                  {blog.title}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                className={({ isActive }) =>
                  'flex items-center gap-1 text-xl  text-opacity-70 hover:underline' +
                  ' ' +
                  (isActive ? 'text-opacity-100 underline' : 'text-opacity-70')
                }
                prefetch='intent'
                to='new'
              >
                <span>create new</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </Page>
  )
}
