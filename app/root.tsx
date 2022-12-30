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

import { getEnv } from './env.server'
import { getUser } from './session.server'
import tailwindStylesheetUrl from './styles/tailwind.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: "Raju's Blog",
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
    <html lang='en' className='h-full bg-neutral-10 font-rfelx text-white'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-surface'>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  )
}
