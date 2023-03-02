import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import { getBlogListItems } from '@/models/blog.server'
import { Outlet, useLoaderData } from '@remix-run/react'
import React, { useEffect } from 'react'

export const loader = async () => {
  const blogs = await getBlogListItems()
  return { blogs }
}

export default function AdminPage() {
  const [isOpen, setIsOpen] = React.useState(false)
  const data = useLoaderData<typeof loader>()

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const aside = document.getElementById('aside')
      const button = document.getElementById('floating-button')
      if (
        aside &&
        button &&
        !aside.contains(e.target as Node) &&
        !button.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const blogs = data.blogs.map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    subtitle: blog.subtitle,
  }))

  function handleToggle() {
    setIsOpen((prev) => !prev)
  }

  return (
    <Layout className='mt-12 flex h-full flex-col items-start gap-6 sm:flex-row'>
      <button
        id='floating-button'
        onClick={handleToggle}
        className='z-20 block text-sm text-white sm:hidden'
      >
        {isOpen ? (
          <span className='ml-2 rounded-sm bg-error py-1 px-3 text-base font-light xs:ml-0'>
            X
          </span>
        ) : (
          <span className='rounded-sm bg-accent-2 py-2 px-3 text-base font-light'>
            &lt; Blogs List
          </span>
        )}
      </button>
      <BlogList blogs={blogs} isOpen={isOpen} />
      <Outlet />
    </Layout>
  )
}
