interface PageProps
  extends React.PropsWithChildren<{
    title?: string
    pageinfo?: string
  }> {}

export default function Page({ children, title, pageinfo }: PageProps) {
  return (
    <main className='mx-auto max-w-3xl'>
      {title ? (
        <h1 className='mt-12 mb-2 text-3xl font-extrabold'>{title}</h1>
      ) : null}
      {pageinfo ? <p className='text-md text-accent-6'>{pageinfo}</p> : null}
      {children}
    </main>
  )
}
