import { ErrorIcon } from './Icons'

export function ErrorFallback({
  children = 'There was a problem. Sorry.',
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex h-20 justify-center rounded-5 border-error pt-4 text-error'>
        <div className='text-center text-error'>
          <div className='flex justify-center gap-1 text-lg font-bold text-error'>
            <ErrorIcon /> Error
          </div>
          <div className='px-2 text-base'>{children}</div>
        </div>
      </div>
    </div>
  )
}
