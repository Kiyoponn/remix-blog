import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import invariant from 'tiny-invariant'
import Page from '~/components/Page'
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
    <Page>
        <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
        <div className='text-neutral-90 text-body-lg'>
          <article
            className='prose prose-invert'
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
    </Page>
  )
}
