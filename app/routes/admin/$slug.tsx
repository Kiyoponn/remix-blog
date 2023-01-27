import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
  useTransition
} from '@remix-run/react'
import { useSpinDelay } from 'spin-delay'
import invariant from 'tiny-invariant'
import { Button } from '~/components/Button'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'
import { ErrorFallback } from '~/ErrorFallback'

import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog
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
  let slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors = {
    title: title ? null : 'Title is required',
    subtitle: subtitle ? null : 'Subtitle is required',
    slug: slug ? null : 'Slug is required',
    markdown: markdown ? null : 'Markdown is required',
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
  if (hasErrors) {
    return json(errors)
  }

  invariant(typeof title === 'string', 'Title must be a string')
  invariant(typeof subtitle === 'string', 'Title must be a string')
  invariant(typeof slug === 'string', 'Slug must be a string')
  invariant(typeof markdown === 'string', 'Markdown must be a string')

  slug = slug.toLowerCase().replace(/[^a-z0-9]/g, '-')

  if (params.slug === 'new') {
    await createBlog({ title, subtitle, slug, markdown })
  } else {
    await updateBlog({ title, subtitle, slug, markdown }, params.slug)
  }

  return redirect(`/admin`)
}

export default function PostAdmin() {
  const data = useLoaderData<typeof loader>()
  const errors = useActionData<typeof action>()
  const transition = useTransition()

  const isCreating = useSpinDelay(
    transition.submission?.formData.get('intent') === 'create'
  )
  const isUpdating = useSpinDelay(
    transition.submission?.formData.get('intent') === 'update'
  )
  const isDeleting = useSpinDelay(
    transition.submission?.formData.get('intent') === 'delete'
  )
  const isNewBlog = !data.blog

  return (
    <Form className='flex w-[480px] ml-auto flex-col gap-3' method='post'>
      <div>
        <Input
          label='Post Title'
          error={errors?.title}
          type='text'
          name='title'
          key={data?.blog?.slug ?? 'new'}
          defaultValue={data?.blog?.title}
          placeholder='Blog title'
        />
      </div>
      <div>
        <Input
          label='Post Subtitle'
          error={errors?.subtitle}
          type='text'
          name='subtitle'
          key={data?.blog?.slug ?? 'new'}
          defaultValue={data?.blog?.subtitle}
          placeholder='Blog subtitle'
        />
      </div>
      <div>
        <Input
          label='Post Slug'
          error={errors?.slug}
          type='text'
          name='slug'
          key={data?.blog?.slug ?? 'new'}
          defaultValue={data?.blog?.slug}
          placeholder='Blog Slug'
        />
      </div>
      <div>
        <TextArea
          label='Markdown'
          error={errors?.markdown}
          id='markdown'
          rows={8}
          key={data?.blog?.markdown ?? 'new'}
          defaultValue={data?.blog?.markdown}
          placeholder='Blog content'
          name='markdown'
        />
      </div>
      <div>
        <div className='mt-10 flex justify-end gap-4'>
          {isNewBlog ? null : (
            <Button
              type='submit'
              name='intent'
              value='delete'
              color='error'
              disabled={isDeleting}
            >
              {isDeleting ? 'deleting...' : 'delete'}
            </Button>
          )}

          <Button
            type='submit'
            name='intent'
            value={isNewBlog ? 'create' : 'update'}
            disabled={isCreating || isUpdating}
          >
            {isNewBlog
              ? isCreating
                ? 'creating...'
                : 'create'
              : isUpdating
              ? 'updating...'
              : 'update'}
          </Button>
        </div>
      </div>
    </Form>
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
