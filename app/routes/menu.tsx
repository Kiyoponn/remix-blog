import { HamburgerIcon } from '@/components/Icons'
import Layout from '@/components/Layout'
import { cn } from '@/utils'
import { useState } from 'react'

export default function MenuPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Layout>
      <nav
        className={cn(
          'absolute top-0 left-0 z-10 h-full overflow-y-auto bg-accent-1 transition-all delay-100 duration-500 ease-snappy',
          isOpen ? 'w-[82%] opacity-100' : 'w-0 opacity-0 delay-100'
        )}
      >
        <ul
          className={cn(
            'absolute top-1/3 ml-4 -translate-x-[250%] transition-transform delay-[675ms] ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-[250%] delay-75'
          )}
        >
          <li className='text-xl tracking-wider'>
            Building a Likes API With Google Cloud Functions
          </li>
          <li className='text-xl tracking-wider'>Code Editor for Android</li>
        </ul>
      </nav>
    </Layout>
  )
}
