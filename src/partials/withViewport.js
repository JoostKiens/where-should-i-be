import { BREAKPOINTS } from '/constants'
import { number, bool } from 'prop-types'
import crossBrowserResize from 'cross-browser-resize'
import { debounce } from '/utils/debounce'
import { isServer } from '/checks'

/*
  NB we use document.body.clientWidth, since it's better than
  window.innerWidth because clientWidth takes the scrollbar width into account
*/

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
