import config from '@kaliber/config'
import javascript from '@kaliber/build/lib/javascript'
import polyfill from '@kaliber/build/lib/polyfill'
import rollbar from '@kaliber/build/lib/rollbar'
import stylesheet from '@kaliber/build/lib/stylesheet'

export function head(title) {
  return (
    <head>
      <title>{title}</title>
      <link
        href={
          'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap'
        }
        rel="stylesheet"
      />
      {stylesheet}
      {rollbar({ accessToken: config.rollbar.accessToken })}
      {polyfill(['default', 'es2015', 'es2016', 'es2017', 'fetch'])}
      {javascript}
    </head>
  )
}
