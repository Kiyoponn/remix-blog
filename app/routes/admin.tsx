import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { getBlogListItems } from '~/models/blog.server'

export const loader = async () => {
  const blogs = await getBlogListItems()
  return { blogs }
}

export default function AdminPage() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <>
      <main className='mt-16'>
        <div className='mx-auto max-w-5xl border-t border-l border-accent-1/50'>
          <div className='ml-9 mt-9 flex gap-[6rem]'>
            <nav>
              <Link to={'/admin'}>
                <h1 className='text-5xl mb-5 font-medium text-accent-2'>
                  Blogs
                </h1>
              </Link>
              <div>
                <ul className='flex flex-col gap-2'>
                  {blogs.map((blog) => (
                    <li key={blog.slug}>
                      <NavLink
                        className={({ isActive }) =>
                          'text-xl text-accent-1 hover:underline' +
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
                        'flex items-center gap-1 text-xl text-accent-1 text-opacity-70 hover:underline' +
                        ' ' +
                        (isActive
                          ? 'text-opacity-100 underline'
                          : 'text-opacity-70')
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
            <main className='flex w-full items-center justify-center'>
              <Outlet />
            </main>
          </div>
        </div>
      </main>
    </>
  )
}
