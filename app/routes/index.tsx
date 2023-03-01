import { Link, useLoaderData } from '@remix-run/react'
import Layout from '@/components/Layout'
import { getBlogs } from '@/models/blog.server'
import { cn, formatDate } from '@/utils'

export const loader = async () => {
  const blogs = await getBlogs()
  return { blogs }
}

export default function Blogs() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <h1 className='mt-8 mb-2 text-3xl font-extrabold'>Remix Blogs</h1>
      <p className='text-md text-accent-6'>
        I write about things I learn and things I find interesting. I also write
        about my experiences as a developer.
      </p>
      <div className='mt-12'>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((blog) => {
              const date = formatDate(blog.updatedAt, 'numeric').replace(
                /\//g,
                '.'
              )

              return (
                <li key={blog.slug}>
                  <Link className='group' prefetch='intent' to={blog.slug}>
                    <div className='flex flex-col-reverse xs:flex-row xs:items-center xs:justify-between'>
                      <h2
                        className={cn(
                          'max-w-sm text-lg font-medium transition-all duration-300 ease-in-out sm:max-w-none',
                          'group-hover:text-magenta group-hover:underline group-hover:decoration-dotted group-hover:underline-offset-4'
                        )}
                      >
                        {blog.title}
                      </h2>
                      <p className='mb-1 text-base text-accent-5 xs:mb-0'>
                        {date}
                      </p>
                    </div>
                    <p className='mt-2 text-accent-6 group-hover:text-accent-6'>
                      {blog.subtitle}
                    </p>
                  </Link>
                  <hr className='mb-6 mt-4 border-accent-2' />
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='text-accent-5'>No blogs found.</p>
        )}
      </div>
    </Layout>
  )
}
