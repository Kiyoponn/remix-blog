import * as React from 'react'

export function ErrorFallback({
  children = 'There was a problem. Sorry.',
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='relative h-full'>
      <div className='bg-red-100 text-red-500 absolute inset-0 flex justify-center pt-4'>
        <div className='text-red-brand text-center'>
          <div className='text-lg font-bold'>Oh snap!</div>
          <div className='px-2 text-base'>{children}</div>
        </div>
      </div>
    </div>
  )
}
