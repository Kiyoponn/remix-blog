import { ErrorIcon } from './Icons'

export function ErrorFallback({
  children = 'There was a problem. Sorry.',
}: {
  children?: React.ReactNode
}) {
  return (
    <main className='relative w-full'>
      <div className='absolute inset-0 mx-auto flex h-20 max-w-md justify-center rounded-5 border-error pt-4 text-error'>
        <div className='text-center text-error'>
          <div className='flex justify-center gap-1 text-lg font-bold text-error'>
            <ErrorIcon /> Error
          </div>
          <div className='px-2 text-base'>{children}</div>
        </div>
      </div>
    </main>
  )
}
