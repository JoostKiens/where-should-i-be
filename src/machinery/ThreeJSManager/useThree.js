import { useContext, useEffect, useRef } from 'react'
import { ThreeJSContext } from './ThreeJSManager'

const noop = () => {}

const useThree = (setup = noop, destroy) => {
  const entityRef = useRef()
  const context = useContext(ThreeJSContext)
  const getEntity = () => entityRef.current

  useEffect(() => {
    entityRef.current = setup(context)
    return () => {
      if (destroy) {
        return destroy(context, getEntity())
      }
      context.scene.remove(getEntity())
    }
    // `context` contains timer and hashes for scene,
    // which update very often so it's not added as dependency
    // so we disable `react-hooks/exhaustive-deps`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destroy, setup])

  return {
    getEntity,
    ...context,
  }
}

export default useThree
