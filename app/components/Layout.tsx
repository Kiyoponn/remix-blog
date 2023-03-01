import { cn } from '@/utils'

interface PageProps extends React.PropsWithChildren {
  className?: string
}

export default function Layout({ children, className }: PageProps) {
  return (
    <section className={cn('mx-4 xs:mx-6 md:mx-auto md:max-w-3xl', className)}>
      {children}
    </section>
  )
}
