/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'vercel',
  serverDependenciesToBundle: ['marked'],
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',

  appDirectory: 'app',
  browserBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',

  future: {
    unstable_tailwind: true,
    unstable_postcss: true,
  },
}
