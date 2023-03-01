import { Link, useLoaderData } from '@remix-run/react'
import Page from '@/components/Page'
import { getBlogs } from '@/models/blog.server'
import { formatDate } from '@/utils'

export const loader = async () => {
  const blogs = await getBlogs()
  return { blogs }
}

export default function Blogs() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <Page
      title='Remix Blogs'
      pageinfo='I write about things I learn and things I find interesting. I also write
    about my experiences as a developer.'
    >
      <div className='mt-16'>
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
                    <div className='flex flex-col justify-between'>
                      <h1 className='text-lg font-medium decoration-dotted underline-offset-4 group-hover:underline'>
                        {blog.title}
                      </h1>
                      <p className='mt-2 text-base text-accent-5'>{date}</p>
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
          <p className='text-accent-6'>No blogs found.</p>
        )}
      </div>
    </Page>
  )
}
