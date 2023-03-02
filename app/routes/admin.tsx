import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import { getBlogListItems } from '@/models/blog.server'
import { cn } from '@/utils'
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
        className='z-20 block rounded-5 text-sm text-white sm:hidden'
      >
        {isOpen ? (
          <span className='ml-2 font-light py-1 px-3 bg-error rounded-5 text-md xs:ml-0'>X</span>
        ) : (
          <span className='text-md font-bold py-2 px-3 rounded-5 bg-accent-2'>Blogs List</span>
        )}
      </button>
      <BlogList blogs={blogs} isOpen={isOpen} />
      <Outlet />
    </Layout>
  )
}
