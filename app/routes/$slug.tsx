import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import invariant from 'tiny-invariant'
import Navbar from '~/components/Navbar'
import { getBlog } from '~/models/blog.server'

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`)

  const blog = await getBlog(params.slug)

  if (!blog) {
    throw new Response('not found', { status: 404 })
  }

  const html = marked(blog.markdown)

  return json({ blog, html })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Blog',
  }
}

export default function Blog() {
  const { blog, html } = useLoaderData<typeof loader>()

  return (
    <>
      <Navbar title={'blog'} />
      <main className='mx-32 mt-28'>
        <div className='border-accent-1/50 max-w-2xl border-l-2'>
          <div className='pl-20'>
            <h1 className='text-5xl text-accent-2 mb-6 font-medium normal-case'>
              {blog.title}
            </h1>
            <article className='text-xl text-tertiary/80 normal-case'>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </article>
          </div>
        </div>
      </main>
    </>
  )
}
