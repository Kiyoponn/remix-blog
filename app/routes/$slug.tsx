import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import readingTime from 'reading-time'
import invariant from 'tiny-invariant'
import Page from '~/components/Page'
import { getBlog } from '~/models/blog.server'
import { formatDate } from '~/utils'

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
    <Page title={blog.title}>
      <p className='mt-4 flex justify-between text-base text-accent-6'>
        <span>
          Raju Khattri /{' '}
          {blog.updatedAt === blog.createdAt
            ? formatDate(blog.createdAt, 'long')
            : formatDate(blog.updatedAt, 'long')}
        </span>
        {readingTime(blog.markdown).text}
      </p>
      <div className='text-neutral-90 text-body-lg mt-10 mb-32'>
        <article
          className='prose prose-invert'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Page>
  )
}
