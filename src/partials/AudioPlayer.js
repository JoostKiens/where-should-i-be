import { useRef, useEffect } from 'react'
import { eventEmitter } from '/machinery/eventEmitter'
import click from '/public/click.mp3'

// @TODO fix unmount issue on hot reload
// Or come up with a solution to play multiple sounds at the same time
export const AudioPlayer = props => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) eventEmitter.on('click', playClick)
    return () => eventEmitter.off('click', playClick)
  }, [audioRef])

  const playClick = () => {
    // const resource = new Audio(click)
    // resource.volume = 0.09
    // // console.log('click')
    // resource.play()
    //audioRef.current.play()
  }

  return <audio src={click} ref={audioRef} />
}
