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
        'absolute top-0 left-0 z-10 h-full overflow-y-auto bg-accent-1 transition-all delay-100 duration-500 ease-snappy',
        isOpen ? 'w-[82%] opacity-100' : 'w-0 opacity-0 delay-100',
        'sm:delay-0 sm:duration-0 sm:relative sm:block sm:h-full sm:w-auto sm:bg-black sm:opacity-100 sm:ease-linear'
      )}
      {...props}
    >
      <h2 className='mt-6 hidden font-bold sm:mt-0 sm:block'>Blogs List</h2>
      <div
        className={cn(
          'flex flex-col gap-4 sm:mt-4',
          'absolute top-44 mx-6 -translate-x-[250%] transition-transform delay-[675ms] ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-[250%] delay-75',
          'sm:delay-0 sm:relative sm:top-0 sm:mx-0 sm:translate-x-0 sm:px-1 sm:pb-4'
        )}
      >
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
              width: 'fit',
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
