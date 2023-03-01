import { buttonStyles } from '@/components/Button'
import Layout from '@/components/Layout'
import { getBlogListItems } from '@/models/blog.server'
import { cn } from '@/utils'
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'

export const loader = async () => {
  const blogs = await getBlogListItems()
  return { blogs }
}

export default function AdminPage() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <Layout className='mt-12 flex items-start justify-between'>
      <aside className='w-32'>
        <Link to={'/admin'}>
          <h1 className='font-bold'>All Blogs List</h1>
        </Link>
        <ul className='mt-4 flex flex-col gap-2'>
          {blogs.map((blog) => (
            <li className='group' key={blog.slug}>
              <NavLink
                className={({ isActive }) =>
                  'group-hover:text-accent-8 ' +
                  (isActive
                    ? 'text-accent-7 underline decoration-dotted underline-offset-4'
                    : 'text-accent-5')
                }
                prefetch='intent'
                to={blog.slug}
              >
                {blog.title}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to='new'
              className={cn(
                buttonStyles({ variant: 'ghost', shade: 'secondary' }),
                'mt-6'
              )}
            >
              create new
            </Link>
          </li>
        </ul>
      </aside>
      <main className='h-full flex-grow'>
        <Outlet />
      </main>
    </Layout>
  )
}
