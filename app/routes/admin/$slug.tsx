import { json, redirect } from '@remix-run/node'
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
  useTransition,
} from '@remix-run/react'
import { LoaderArgs } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import { ErrorFallback } from '~/ErrorFallback'

import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
} from '~/models/blog.server'
import { requireAdminUser } from '~/session.server'

export async function loader({ request, params }: LoaderArgs) {
  await requireAdminUser(request)

  invariant(params.slug, 'slug not found')
  if (params.slug === 'new') {
    return json({ blog: null })
  }

  const blog = await getBlog(params.slug)
  if (!blog) {
    throw new Response('not found', { status: 404 })
  }

  return json({ blog })
}

export async function action({ request, params }: LoaderArgs) {
  await requireAdminUser(request)
  const formData = await request.formData()
  const intent = formData.get('intent')

  invariant(typeof params.slug === 'string', 'slug not provided')

  if (intent === 'delete') {
    await deleteBlog(params.slug)
    return redirect('/admin')
  }

  const title = formData.get('title')
  const subtitle = formData.get('subtitle')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors = {
    title: title ? null : 'title is required',
    subtitle: subtitle ? null : 'subtitle is required',
    slug: slug ? null : 'slug is required',
    markdown: markdown ? null : 'markdown is required',
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
  if (hasErrors) {
    return json(errors)
  }

  invariant(typeof title === 'string', 'title must be a string')
  invariant(typeof subtitle === 'string', 'title must be a string')
  invariant(typeof slug === 'string', 'slug must be a string')
  invariant(typeof markdown === 'string', 'markdown must be a string')

  if (params.slug === 'new') {
    await createBlog({ title, subtitle, slug, markdown })
  } else {
    await updateBlog({ title, subtitle, slug, markdown }, params.slug)
  }

  return redirect(`/admin`)
}

const inputClassName =
  'w-full border-[1.5px] border-accent-1/30 bg-primary p-2 placeholder-accent-2/40 placeholder:italic focus:border-accent-1 focus:ring focus:ring-accent-1 focus:ring-opacity-20 focus:ring-offset-0'
const buttonClassName = `h-12 w-28 text-xl text-primary focus:outline-none focus:ring focus:ring-accent-1 focus:ring-opacity-20 focus:ring-offset-0`

export default function PostAdmin() {
  const data = useLoaderData<typeof loader>()
  const errors = useActionData<typeof action>()
  const transition = useTransition()

  const isCreating = transition.submission?.formData.get('intent') === 'create'
  const isUpdating = transition.submission?.formData.get('intent') === 'update'
  const isDeleting = transition.submission?.formData.get('intent') === 'delete'
  const isNewBlog = !data.blog

  return (
    <div className='bg-primary w-full'>
      <Form
        className='my-11 mx-auto flex w-[480px] flex-col gap-7 normal-case text-accent-1'
        method='post'
      >
        <div>
          <label>
            Post Title:{' '}
            {errors?.title ? (
              <em className='font-light text-accent-2'>{errors.title}</em>
            ) : null}
            <input
              type='text'
              name='title'
              key={data?.blog?.slug ?? 'new'}
              defaultValue={data?.blog?.title}
              placeholder='blog title'
              className={`${inputClassName} text-tertiary font-light`}
            />
          </label>
        </div>
        <div>
          <label>
            Post subtitle:{' '}
            {errors?.subtitle ? (
              <em className='font-light text-accent-2'>{errors.subtitle}</em>
            ) : null}
            <input
              type='text'
              name='subtitle'
              key={data?.blog?.slug ?? 'new'}
              defaultValue={data?.blog?.subtitle}
              placeholder='blog subtitle'
              className={`${inputClassName} text-tertiary font-light`}
            />
          </label>
        </div>
        <div>
          <label>
            Post Slug:{' '}
            {errors?.slug ? (
              <em className='font-light text-accent-2'>{errors.slug}</em>
            ) : null}
            <input
              type='text'
              name='slug'
              key={data?.blog?.slug ?? 'new'}
              defaultValue={data?.blog?.slug}
              placeholder='blog slug'
              // disabled={Boolean(data.blog)}
              className={`${inputClassName} text-tertiary font-light`}
            />
          </label>
        </div>
        <div>
          <label htmlFor='markdown'>
            Markdown:{' '}
            {errors?.markdown ? (
              <em className='font-light text-accent-2'>{errors.markdown}</em>
            ) : null}
          </label>
          <textarea
            name='markdown'
            id='markdown'
            rows={8}
            key={data?.blog?.markdown ?? 'new'}
            defaultValue={data?.blog?.markdown}
            placeholder='blog body (with markdowns)'
            className={`${inputClassName} } text-tertiary font-light`}
          ></textarea>
          <div className='mt-10 flex justify-end gap-4'>
            {isNewBlog ? null : (
              <button
                type='submit'
                name='intent'
                value='delete'
                disabled={isDeleting}
                className={`${buttonClassName} bg-accent-2 hover:bg-accent-2/90`}
              >
                {isDeleting ? 'deleting...' : 'delete'}
              </button>
            )}
            <button
              type='submit'
              name='intent'
              value={isNewBlog ? 'create' : 'update'}
              disabled={isCreating || isUpdating}
              className={`${buttonClassName} bg-accent-1 hover:bg-accent-1/90`}
            >
              {isNewBlog
                ? isCreating
                  ? 'creating'
                  : 'create'
                : isUpdating
                ? 'updating...'
                : 'update'}
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()

  if (caught.status === 404) {
    return (
      <ErrorFallback>
        There was no blog post found with the slug "{params.slug}"
      </ErrorFallback>
    )
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return <ErrorFallback>There was a problem. Sorry.</ErrorFallback>
}
