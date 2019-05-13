import { BREAKPOINTS } from '/constants'
import crossBrowserResize from 'cross-browser-resize'
import { debounce } from '/utils/debounce'
import { isServer } from '/checks'
import { useEffect, useState } from 'react'
import useRefMounted from 'react-use/lib/useRefMounted'

export const useViewport = () => {
  const refMounted = useRefMounted()
  const [viewport, setViewport] = useState(getViewport(isServer()))

  useEffect(() => {
    crossBrowserResize.addListener(handleResize)
    return () => crossBrowserResize.removeListener(handleResize)
  })

  const handleResize = debounce(
    () => refMounted.current && setViewport(getViewport()),
    250
  )

  return viewport
}

const getViewport = (isServer = false) => {
  const viewportWidth = !isServer ? document.body.clientWidth : 0
  return {
    viewportHeight: !isServer ? window.innerHeight : 0,
    viewportLg: viewportWidth >= BREAKPOINTS.LG,
    viewportMd: viewportWidth >= BREAKPOINTS.MD,
    viewportSm: viewportWidth >= BREAKPOINTS.SM,
    viewportWidth,
    viewportXl: viewportWidth >= BREAKPOINTS.XL,
  }
}

/*
export const withViewport = () => WrappedComponent => {
  class WithViewport extends Component {
    static displayName = `withViewport(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`

    state = {
      viewportHeight: isServer() ? 0 : window.innerHeight,
      viewportWidth: isServer() ? 0 : document.body.clientWidth,
    }

    unMounted = false

    handleResize = debounce(() => {
      if (this.unMounted) return

      this.setState({
        viewportHeight: window.innerHeight,
        viewportWidth: document.body.clientWidth,
      })
    }, 250)

    componentDidMount() {
      crossBrowserResize.addListener(this.handleResize)
    }

    componentWillUnmount() {
      this.unMounted = true
      crossBrowserResize.removeListener(this.handleResize)
    }

    render() {
      const { forwardedRef, ...restProps } = this.props
      const { viewportWidth } = this.state

      const viewportProps = {
        viewportSm: viewportWidth >= BREAKPOINTS.SM,
        viewportMd: viewportWidth >= BREAKPOINTS.MD,
        viewportLg: viewportWidth >= BREAKPOINTS.LG,
        viewportXl: viewportWidth >= BREAKPOINTS.XL,
      }

      return (
        <WrappedComponent
          ref={forwardedRef}
          {...restProps}
          {...this.state}
          {...viewportProps}
        />
      )
    }
  }

  WrappedComponent.propTypes = {
    ...WrappedComponent.propTypes,
    viewportHeight: number.isRequired,
    viewportWidth: number.isRequired,
    viewportSm: bool.isRequired,
    viewportMd: bool.isRequired,
    viewportLg: bool.isRequired,
    viewportXl: bool.isRequired,
  }

  return React.forwardRef((props, ref) => (
    <WithViewport {...props} forwardedRef={ref} />
  ))
}
*/
