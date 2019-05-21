import { Chart } from '/partials/Chart/Chart'
import { useEffect, useState } from 'react'
import Hammer from 'react-hammerjs'

export default function Main({ docs }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [setIsMounted])
  return (
    <div>
      <h1>Charts</h1>
      <div style={{ width: `100vw`, height: `100vh` }}>
        {!isMounted ? null : <Chart docs={docs} />}
      </div>
    </div>
  )
}

function handleSwipe(e) {
  // console.log('Swipe', e)
}
function handlePan(e) {
  // console.log('Pan', e)
}
