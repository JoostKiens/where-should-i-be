import variablesStyles from '/styles/breakpoints.css'

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
