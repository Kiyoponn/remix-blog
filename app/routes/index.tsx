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
      <main className='mx-auto max-w-6xl'>
        <div className='mx-auto mt-24 max-w-3xl rounded-lg bg-surface-1 px-12 pt-16 pb-14 shadow-elvation-2'>
          <ul>
            {blogs.map((blog) => {
              const date = new Date(blog.updatedAt)
                .toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
                .replace(/\//g, '.')

              return (
                <li key={blog.slug}>
                  <p className='mb-1 text-label-md font-light text-neutral-80'>
                    {date}
                  </p>
                  <Link className='group' prefetch='intent' to={blog.slug}>
                    <h1 className='mb-2 w-[360px] text-headline-md underline-offset-8 transition-colors duration-150 ease-in group-hover:text-primary-80 group-hover:underline'>
                      {blog.title}
                    </h1>
                    <p className='text-tertiary/80 w-[360px] text-body-md normal-case text-neutral-90'>
                      {removeMd(blog.markdown).slice(0, 100) + '...'}
                    </p>
                  </Link>
                  {blogs.length - 1 === blogs.indexOf(blog) ? null : (
                    <hr className='my-8 border-neutral-variant-30' />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </>
  )
}
