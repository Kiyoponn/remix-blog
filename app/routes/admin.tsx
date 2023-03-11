import BlogList from '@/components/BlogList'
import { HamburgerIcon } from '@/components/Icons'
import Layout from '@/components/Layout'
import { getBlogListItems } from '@/models/blog.server'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import React, { useEffect } from 'react'

export const loader = async () => {
  const blogs = await getBlogListItems()
  return { blogs }
}

export default function AdminPage() {
  const [isOpen, setIsOpen] = React.useState(false)
  const data = useLoaderData<typeof loader>()
  const location = useLocation()

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

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const blogs = data.blogs.map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    subtitle: blog.subtitle,
  }))

  function handleToggle() {
    setIsOpen((prev) => !prev)
  }

  return (
    <Layout className='mt-6 flex h-full flex-col items-start gap-6 sm:flex-row'>
      <div className='z-20 block sm:hidden'>
        <button
          id='floating-button'
          onClick={handleToggle}
          aria-expanded={isOpen}
          className='flex items-center justify-center rounded-full duration-150 ease-in-out'
        >
          <HamburgerIcon className='stroke-white' />
        </button>
      </div>
      <BlogList blogs={blogs} isOpen={isOpen} />
      <Outlet />
    </Layout>
  )
}
