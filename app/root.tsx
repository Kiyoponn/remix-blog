import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import Navbar from './components/Navbar'

import { getEnv } from './env.server'
import { getUser } from './session.server'
import styles from '@/styles/tailwind.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;1,300;1,400&display=swap',
    },
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/tokyo-night-dark.min.css',
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'A Blog Website',
  description: 'A blog about web development and programming.',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
    ENV: getEnv(),
  })
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <html
      lang='en'
      className='h-screen bg-black font-space-grotesk text-white selection:bg-purple selection:text-white'
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className='h-[100dvh]'>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
