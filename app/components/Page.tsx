interface PageProps
  extends React.PropsWithChildren<{
    title?: string
    pageinfo?: string
  }> {}

export default function Page({ children, title, pageinfo }: PageProps) {
  return (
    <main className='mx-auto max-w-3xl'>
      <h1 className='mt-14 mb-2 text-4xl font-extrabold'>{title}</h1>
      {pageinfo ? <p className='text-md text-accent-6'>{pageinfo}</p> : null}
      {children}
    </main>
  )
}
