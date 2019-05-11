import { withViewport } from '/partials/withViewport'
import ThreeChart from '/partials/ThreeChart/index'

export default
@withViewport()
class ChartWrapper extends Component {
  state = { isMounted: false }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
  }

  render() {
    const {
      colorScale,
      docsNL,
      docsTH,
      highMax,
      lowMin,
      viewportWidth,
      viewportHeight,
    } = this.props
    return (
      this.state.isMounted && (
        <ThreeChart
          colorScale={colorScale}
          docsNL={docsNL}
          docsTH={docsTH}
          highMax={highMax}
          lowMin={lowMin}
          width={viewportWidth}
          height={viewportHeight}
        />
      )
    )
  }
}
