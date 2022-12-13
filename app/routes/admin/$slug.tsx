import { json, redirect } from '@remix-run/node'
import { Form, useTransition } from '@remix-run/react'
import { LoaderArgs } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import { deletePost, getPost, updatePost } from '~/models/blog.server'
import { requireAdminUser } from '~/session.server'

export async function loader({ request, params }: LoaderArgs) {
  await requireAdminUser(request)

  invariant(params.slug, 'slug not found')
  if (params.slug === 'new') {
    return json({ post: null })
  }

  const post = await getPost(params.slug)
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ post })
}

export async function action({ request, params }: LoaderArgs) {
  await requireAdminUser(request)
  const formData = await request.formData()
  const intent = formData.get('intent')

  invariant(typeof params.slug === 'string', 'slug not provided')

  if (intent === 'delete') {
    await deletePost(params.slug)
    return redirect('/admin')
  }

  const title = formData.get('title')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors = {
    title: title ? null : 'title is required',
    slug: slug ? null : 'slug is required',
    markdown: markdown ? null : 'markdown is required'
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
  if (hasErrors) {
    return json(errors)
  }

  if(params.slug === 'new') {
    await create
  }
}

const inputClassName =
  'w-full border-[1.5px] border-accent-1/30 bg-primary p-2 placeholder-accent-2/40 placeholder:italic focus:border-accent-1 focus:ring focus:ring-accent-1 focus:ring-opacity-20 focus:ring-offset-0'

export default function PostAdmin() {
  const transition = useTransition()

  return (
    <div className='h-[60vh] w-full bg-primary'>
      <Form
        className='my-11 mx-auto flex w-[480px] flex-col gap-7 normal-case text-accent-1'
        method='post'
      >
        <div>
          <label>
            Post Title:
            <input
              type='text'
              name='title'
              className={`${inputClassName} font-light text-tertiary`}
            />
          </label>
        </div>
        <div>
          <label>
            Post Slug:
            <input
              type='text'
              name='title'
              className={`${inputClassName} font-light text-tertiary`}
            />
          </label>
        </div>
        <div>
          <label htmlFor='markdown'>Markdown:</label>
          <textarea
            name='markdown'
            id='markdown'
            rows={8}
            className={`${inputClassName} font-light text-tertiary`}
          ></textarea>
          <div className='flex justify-end gap-4'>
            <button type='submit'>create</button>
          </div>
        </div>
      </Form>
    </div>
  )
}
