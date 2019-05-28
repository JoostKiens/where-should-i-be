import variablesStyles from '/styles/breakpoints.css'
import { times } from '/machinery/array'

const INC = (Math.PI * 2) / 365
export const ARCS = times(365)
  .reverse()
  .map(x => x * INC)

export const LOCATIONS = {
  NL: { lat: 52.090654, lon: 5.092966, name: 'Utrecht' },
  TH: { lat: 13.7539, lon: 100.8161, name: 'Bangkok' },
}

export const BREAKPOINTS = {
  SM: parseInt(variablesStyles.breakpointSm, 10),
  MD: parseInt(variablesStyles.breakpointMd, 10),
  LG: parseInt(variablesStyles.breakpointLg, 10),
  XL: parseInt(variablesStyles.breakpointXl, 10),
}

export const CHART_MAX_TEMP = 40
export const CHART_MIN_TEMP = -10

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
