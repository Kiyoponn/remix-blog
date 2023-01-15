import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import Page from '~/components/Page'
import { getBlogs } from '~/models/blog.server'

export const loader = async () => {
  const blogs = await getBlogs()
  return { blogs }
}

export default function Blogs() {
  const { blogs } = useLoaderData<typeof loader>()

  return (
    <Page
      title='Blog'
      pageinfo='I write about things I learn and things I find interesting. I also write
    about my experiences as a developer.'
    >
      <div className='mt-16'>
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
                <Link className='group' prefetch='intent' to={blog.slug}>
                  <div className='flex justify-between'>
                    <h1
                      className={clsx(
                        'text-lg font-medium',
                        'after:block after:h-[1px] after:w-full after:scale-0 after:bg-white after:transition-transform after:duration-200 after:ease-in-out after:content-[""] group-hover:after:scale-100',
                      )}
                    >
                      {blog.title}
                    </h1>
                    <p className='text-base text-accent-5'>{date}</p>
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
      </div>
    </Page>
  )
}
