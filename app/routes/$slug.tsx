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
      <main className='mx-auto max-w-6xl'>
        <div className='mx-auto mt-24 w-2/4 px-16 py-8'>
          <h1 className='mb-4 text-title-lg font-semibold'>{blog.title}</h1>
          <article className='text-body-lg text-neutral-90'>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>
      </main>
    </>
  )
}
