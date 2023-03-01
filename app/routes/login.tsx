import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useSearchParams } from '@remix-run/react'

import { createUserSession, getUserId } from '@/session.server'
import { cn, safeRedirect, validateEmail } from '@/utils'

import React from 'react'
import { Button } from '@/components/Button'
import Input from '@/components/Input'
import { verifyLogin } from '@/models/user.server'
import Layout from '@/components/Layout'

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
  const emailRef = React.useRef<HTMLInputElement>(null)
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
      emailRef.current?.focus()
    } else if (passwordError) {
      passwordRef.current?.focus()
    }
  }, [emailError, passwordError])

  return (
    <Layout>
      <Form method='post'>
        <fieldset className='mt-6 flex max-w-xl flex-col gap-4'>
          <legend className='text-3xl font-extrabold'>Login</legend>
          <p className='text-accent-5'>Enter your credentials to login</p>
          <div>
            <Input
              ref={emailRef}
              id='email'
              name='email'
              type='email'
              label='Email'
              error={emailError}
              required
              autoComplete='email'
              aria-invalid={emailError ? true : undefined}
              aria-describedby='email-error'
              placeholder='you@example.com'
            />
          </div>
          <div>
            <Input
              ref={passwordRef}
              id='password'
              name='password'
              type='password'
              label='Password'
              error={passwordError}
              required
              autoComplete='password'
              aria-invalid={passwordError ? true : undefined}
              aria-describedby='password-error'
              placeholder='********'
            />
          </div>

          <div className='flex items-center'>
            <input
              id='remember'
              name='remember'
              type='checkbox'
              className={cn(
                'cursor-pointer text-transparent transition-all duration-150 ease-in-out',
                'rounded-5 border-accent-5 bg-black outline-none',
                'hover:border-white hover:checked:border-white',
                'focus:outline-none focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0 focus:checked:border-accent-5 focus:hover:border-white',
                'checked:border-accent-5 checked:text-transparent '
              )}
            />
            <label htmlFor='remember' className='ml-2 block text-sm text-white'>
              Remember me
            </label>
          </div>

          <input type='hidden' name='redirectTo' value={redirectTo} />
          <Button size='large' width='full'>
            Login
          </Button>
        </fieldset>
      </Form>
    </Layout>
  )
}
