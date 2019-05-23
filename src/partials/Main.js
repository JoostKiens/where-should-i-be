import { Chart } from '/partials/Chart/Chart'
import { Toucher } from '/partials/Toucher'
import { Hud } from '/partials/Hud/Hud'
import { useEffect, useState } from 'react'
import { StateProvider } from '/machinery/state'
import { reducer, initialState } from '/store'
import { enrichDocs } from '/enrichDocs'

const coverStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
}

export default function Main({ docs }) {
  const [isMounted, setIsMounted] = useState(false)

  // also need to add weights for niceness
  // @TODO we should do this before we store on server
  const docsWithArc = enrichDocs(docs)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [setIsMounted])

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {!isMounted ? null : <Scene docs={docsWithArc} />}
    </StateProvider>
  )
}

const Scene = ({ docs }) => (
  <div style={{ position: 'relative', width: `100vw`, height: `100vh` }}>
    <Chart docs={docs} style={coverStyle} />
    <Hud docs={docs} style={coverStyle} />
    <Toucher style={coverStyle} />
  </div>
)
