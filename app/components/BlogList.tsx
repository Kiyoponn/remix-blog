import { cn } from '@/utils'
import { Blog } from '@prisma/client'
import { Link, NavLink } from '@remix-run/react'
import { buttonStyles } from './Button'

type BlogType = Pick<Blog, 'slug' | 'title' | 'subtitle'>[]

interface Aside
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  blogs: BlogType
  isOpen: boolean
}

const BlogList: React.FC<Aside> = ({ blogs, isOpen, className, ...props }) => {
  return (
    <aside
      id='aside'
      className={cn(
        'z-10 -translate-x-[150%] transition-transform ease-in-out',
        'fixed left-0 top-32 max-h-min min-h-[620px] min-w-[280px] max-w-[320px] overflow-auto rounded-5 bg-black/40 py-8 px-6 backdrop-blur-md',
        'sm:static sm:inset-0 sm:max-h-none sm:min-h-0 sm:w-[148px] sm:min-w-0 sm:translate-x-0 sm:overflow-visible sm:rounded-none sm:bg-black sm:py-0 sm:px-0 sm:opacity-100 sm:shadow-none sm:transition-none',
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-[150%] opacity-0'
      )}
      {...props}
    >
      <h2 className='mt-6 hidden font-bold sm:mt-0 sm:block'>Blogs List</h2>
      <div className='mt-6 flex flex-col gap-4 sm:mt-4'>
        {blogs.map((blog) => (
          <NavLink
            key={blog.slug}
            className={({ isActive }) =>
              'hover:text-accent-8 ' +
              (isActive
                ? 'text-accent-7 underline decoration-dotted underline-offset-4'
                : 'text-accent-5')
            }
            prefetch='intent'
            to={blog.slug}
          >
            {blog.title}
          </NavLink>
        ))}
        <Link
          to='new'
          className={cn(
            buttonStyles({
              intent: 'ghost',
              width: 'full',
              size: 'md',
              shades: 'secondary',
            }),
            'mt-6'
          )}
        >
          create new
        </Link>
      </div>
    </aside>
  )
}

export default BlogList
