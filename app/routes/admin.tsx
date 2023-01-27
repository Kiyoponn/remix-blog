import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { Button } from '~/components/Button'
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
      <nav className='w-32'>
        <Link to={'/admin'}>
          <h1 className='font-bold'>All Blogs</h1>
        </Link>
        <ul className='mt-4 flex flex-col gap-2'>
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <NavLink
                className={({ isActive }) =>
                  'hover:text-accent-8 ' +
                  (isActive ? 'text-accent-7 underline' : 'text-accent-5')
                }
                prefetch='intent'
                to={blog.slug}
              >
                {blog.title}
              </NavLink>
            </li>
          ))}
          <li>
            <Button
              href='new'
              variant='ghost'
              color='secondary'
              className='mt-6'
            >
              create new
            </Button>
          </li>
        </ul>
      </nav>
      <main className='flex-grow h-full'>
        <Outlet />
      </main>
    </Page>
  )
}
