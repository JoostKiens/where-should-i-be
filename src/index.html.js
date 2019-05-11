import 'normalize.css'
import head from '/partials/head'
import { getDocs } from '/data/doc'
import Main from '/partials/Main?universal'
import { Error } from '/partials/Error'

main.routes = {
  match: async ({ pathname }) => {
    try {
      if (pathname === '/') {
        const docs = await getDocs()
        const missing = !docs
        return { status: missing ? 404 : 200, data: { missing, docs } }
      }
      return { status: 404, data: { missing: true } }
    } catch (e) {
      return { status: 500, data: { error: true } }
    }
  },
}

export default function main({ data }) {
  if (!data) return null

  return (
    <html lang="en">
      {head('Rendered on server')}
      <body>
        {data.error || data.missing ? <Error /> : <Main docs={data.docs} />}
      </body>
    </html>
  )
}
