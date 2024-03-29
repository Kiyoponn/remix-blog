import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import readingTime from 'reading-time'
import invariant from 'tiny-invariant'
import { getBlog } from '@/models/blog.server'
import { formatDate } from '@/utils'
import Layout from '@/components/Layout'

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, 'slug is required')

  const blog = await getBlog(params.slug)

  if (!blog) {
    throw new Response('not found', { status: 404 })
  }

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const hljs = require('highlight.js')
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
    langPrefix: 'language-',
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false,
  })

  const html = marked.parse(blog.markdown)

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
    <Layout>
      <h1 className='mt-8 mb-2 text-3xl font-extrabold'>{blog.title}</h1>
      <p className='mt-4 flex justify-between text-base text-accent-6'>
        <span>
          Raju Khattri /{' '}
          {blog.updatedAt === blog.createdAt
            ? formatDate(blog.createdAt, 'long')
            : formatDate(blog.updatedAt, 'long')}
        </span>
        {readingTime(blog.markdown).text}
      </p>
      <div className='text-neutral-90 text-body-lg my-10'>
        <article
          className='prose prose-invert'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}
