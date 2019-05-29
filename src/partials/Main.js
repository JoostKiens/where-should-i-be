import { Chart } from '/partials/Chart/Chart'
import { Toucher } from '/partials/Toucher'
import { Hud } from '/partials/Hud/Hud'
import { useEffect, useState } from 'react'
import { ViewportContextProvider } from '/machinery/useViewport'
import { StoreProvider } from '/store'
import { enrichDocs } from '/enrichDocs'
import styles from './Main.css'

const childStyle = {
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
  const enrichedDocs = enrichDocs(docs)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [setIsMounted])

  return (
    <StoreProvider>
      <ViewportContextProvider>
        {!isMounted ? null : <Scene docs={enrichedDocs} />}
      </ViewportContextProvider>
    </StoreProvider>
  )
}

const Scene = ({ docs }) => (
  <main className={styles.main}>
    <Chart docs={docs} style={childStyle} />
    <Hud docs={docs} style={childStyle} />
    <Toucher style={childStyle} />
  </main>
)
