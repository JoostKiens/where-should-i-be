import { scaleLinear, scaleSequential, scaleTime } from 'd3-scale'
import { extent } from 'd3-array'
import { interpolateRdYlBu } from 'd3-scale-chromatic'

export function createColorScale(data) {
  const [min, max] = extent(
    data,
    ({ temperatureMax, temperatureMin }) =>
      (temperatureMax + temperatureMin) / 2
  ).reverse()
  return scaleSequential()
    .domain([min + 2, max + 5])
    .interpolator(interpolateRdYlBu)
}

export function createHeightScale(lowMin, highMax, chartHeight) {
  return scaleLinear()
    .domain([lowMin, highMax])
    .range([chartHeight / 10, chartHeight / 2])
}

export function createTimeToAngleScale(oldest, newest) {
  return scaleTime()
    .domain([oldest, newest])
    .range([Math.PI * 2, 0])
}
