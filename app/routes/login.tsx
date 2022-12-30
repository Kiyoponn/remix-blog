import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useSearchParams } from '@remix-run/react'

import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect, validateEmail } from '~/utils'

import * as React from 'react'
import Navbar from '~/components/Navbar'
import { verifyLogin } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')
  const remember = formData.get('remember')

  if (!validateEmail(email)) {
    return json({ errors: { email: 'Email is invalid' } }, { status: 400 })
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { password: 'Password is required' } },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return json(
      { errors: { password: 'Password is too short' } },
      { status: 400 }
    )
  }

  const user = await verifyLogin(email, password)

  let userId

  if (!user) {
    return json(
      { errors: { password: 'Invalid email or password' } },
      { status: 400 }
    )
  }
  userId = user.id

  return createUserSession({
    request,
    userId,
    remember: remember === 'on' ? true : false,
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  }
}

export default function LoginPage() {
  const [searchParamas] = useSearchParams()
  const redirectTo = searchParamas.get('redirectTo') || '/'
  const actionData = useActionData<typeof action>()
  const emaiRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  let emailError: string | null = null
  let passwordError: string | null = null

  if (actionData && actionData.errors) {
    const { errors } = actionData
    emailError = 'email' in errors ? errors.email : null
    passwordError = 'password' in errors ? errors.password : null
  }

  React.useEffect(() => {
    if (emailError) {
      emaiRef.current?.focus()
    } else if (passwordError) {
      passwordRef.current?.focus()
    }
  }, [emailError, passwordError])

  return (
    <>
      <Navbar title={'login'} />
      <main>
        <div className='border-accent-1 bg-primary mx-auto mt-40 max-h-[360px] w-[720px] border blur-none drop-shadow-[32px_32px_0_rgba(43,35,185)]'>
          <Form
            method='post'
            className='mx-auto flex max-w-2xl flex-col gap-5 p-14'
          >
            <div>
              <label
                className='text-xl text-accent-1 font-medium normal-case'
                htmlFor='email'
              >
                Email:
              </label>
              <input
                ref={emaiRef}
                id='email'
                name='email'
                type='email'
                required
                autoComplete='email'
                aria-invalid={emailError ? true : undefined}
                aria-describedby='email-error'
                placeholder='you@example.com'
                className='border-accent-1/30 bg-primary placeholder-accent-2/40 focus:border-accent-1 focus:ring-accent-1 h-11 w-full border-[1.5px] p-2 font-light placeholder:font-light placeholder:italic focus:ring focus:ring-opacity-20 focus:ring-offset-0'
              />
              {emailError && (
                <div
                  className='text-accent-2 pt-1 normal-case'
                  id='email-error'
                >
                  {emailError}
                </div>
              )}
            </div>

            <div>
              <label
                className='text-xl text-accent-1 font-medium normal-case'
                htmlFor='password'
              >
                Password:
              </label>
              <input
                ref={passwordRef}
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                aria-invalid={passwordError ? true : undefined}
                aria-describedby='password-error'
                required
                className=' border-accent-1/30 bg-primary focus:border-accent-1 focus:ring-accent-1 h-11 w-full border-[1.5px] p-2 font-light focus:ring focus:ring-opacity-20 focus:ring-offset-0'
              />
              {passwordError && (
                <div className='text-accent-2 pt-1' id='password-error'>
                  {passwordError}
                </div>
              )}
            </div>

            <div className='flex items-center'>
              <input
                id='remember'
                name='remember'
                type='checkbox'
                className='border-accent-1/30 bg-primary text-accent-1 focus:border-accent-1 focus:ring-accent-1 h-4 w-4 border-[1.5px] font-light focus:ring focus:ring-opacity-20 focus:ring-offset-0'
              />
              <label
                htmlFor='remember'
                className='text-sm text-accent-1 ml-2 block'
              >
                Remember me
              </label>
            </div>

            <input type='hidden' name='redirectTo' value={redirectTo} />
            <button
              name='submit'
              type='submit'
              value='login'
              className='bg-accent-1 text-xl text-primary hover:bg-accent-1/90 focus:ring-accent-1 mx-auto h-12 w-32 focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-offset-0'
            >
              log in
            </button>
          </Form>
        </div>
      </main>
    </>
  )
}
