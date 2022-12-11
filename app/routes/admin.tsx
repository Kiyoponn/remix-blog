import { Link, Outlet, useLoaderData } from '@remix-run/react'
import Navbar from '~/components/Navbar'
import { getPostListItems } from '~/models/post.server'

export const loader = async () => {
  const posts = await getPostListItems()
  return { posts }
}

export default function LoginPage() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <>
      <Navbar title={'blog admin'} cta={true} />
      <section className='mt-16'>
        <div className='mx-auto max-w-5xl border-t border-l border-accent-1/50'>
          <div className='ml-9 mt-9 flex gap-[6rem]'>
            <nav>
              <h1 className='mb-5 text-5xl font-medium text-accent-2'>Blogs</h1>
              <div>
                <ul className='flex flex-col gap-2'>
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link prefetch='intent' to={post.slug}>
                        <h1 className='text-xl text-accent-1 text-opacity-70  underline'>
                          {post.title}
                        </h1>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <main className='flex w-full items-center justify-center'>
              <Outlet />
            </main>
          </div>
        </div>
      </section>
    </>
  )
}
