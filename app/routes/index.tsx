import { Link, useLoaderData } from '@remix-run/react'
import removeMd from 'remove-markdown'
import Navbar from '~/components/Navbar'
import { getPostListItems } from '~/models/post.server'

export const loader = async () => {
  const posts = await getPostListItems()
  return { posts }
}

export default function Blogs() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <>
      <Navbar title='Blogs' cta={true} />
      <main className='mx-32 mt-28'>
        <div className='max-w-2xl border-l-2 border-accent-1/50'>
          <ul className='flex flex-col gap-11 pl-20'>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug}>
                  <h1 className='text-2xl text-accent-2 underline'>
                    {post.title}
                  </h1>
                  <p className='normal-case text-tertiary/80'>
                    {removeMd(post.markdown).slice(0, 100) + '...'}
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
