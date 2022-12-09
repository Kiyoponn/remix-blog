import { Form } from '@remix-run/react'
import Navbar from '~/components/Navbar'

export default function Login() {
  return (
    <>
      <Navbar title={'login'} cta={false} />
      <main>
        <div className='mx-auto mt-40 max-h-[360px] w-[720px] border border-accent-1 bg-primary blur-none drop-shadow-[32px_32px_0_rgba(43,35,185)]'>
          <Form className='mx-auto flex max-w-2xl flex-col gap-5 p-14'>
            <div>
              <label
                className='text-xl font-medium normal-case text-accent-1'
                htmlFor='email'
              >
                Email:
              </label>
              <input
                className='h-11 w-full border border-accent-1/30 bg-primary p-2 placeholder-accent-2/40 placeholder:italic focus:border focus:border-accent-1 focus:outline-none'
                type='email'
                placeholder='you@example.com'
                required
              />
            </div>

            <div>
              <label
                className='text-xl font-medium normal-case text-accent-1'
                htmlFor='password'
              >
                Password:
              </label>
              <input
                className='h-11 w-full border border-accent-1/30 bg-primary p-2 placeholder-accent-2/40 placeholder:italic focus:border focus:border-accent-1 focus:outline-none'
                type='password'
                required
              />
            </div>

            <input type='hidden' name='redirectTo' value='/' />
            <button
              className='mx-auto h-12 w-32 bg-accent-1 text-xl text-primary hover:bg-accent-1/90'
              type='submit'
            >
              log in
            </button>
          </Form>
        </div>
      </main>
    </>
  )
}
