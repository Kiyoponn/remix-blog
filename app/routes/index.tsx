import { Link, useLoaderData } from '@remix-run/react'
import removeMd from 'remove-markdown'
import Navbar from '~/components/Navbar'
import { getBlogs } from '~/models/blog.server'

export const loader = async () => {
  const blogs = await getBlogs()
  return { blogs }
}

export default function Blogs() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <>
      <Navbar title='blogs' />
      <main className='mx-32 mt-28'>
        <div className='max-w-2xl border-l-2 border-accent-1/50'>
          <ul className='flex flex-col gap-11 pl-20'>
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link prefetch='intent' to={blog.slug}>
                  <h1 className='text-2xl text-accent-2 underline'>
                    {blog.title}
                  </h1>
                  <p className='normal-case text-tertiary/80'>
                    {removeMd(blog.markdown).slice(0, 100) + '...'}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
