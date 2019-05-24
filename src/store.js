import { ARCS } from '/constants'

export const initialState = { arc: 0, snapArc: 0, isPanning: false }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementArc':
      return {
        ...state,
        // normalize arc, always between 0 and 2*Math.PI
        arc: (state.arc + action.value + Math.PI * 2) % (Math.PI * 2),
      }
    case 'snapTo':
      return {
        ...state,
        // @TODO should this not return an index for easier snapability?
        snapArc: ARCS.reduce((res, curr) =>
          Math.abs(curr - state.arc) < Math.abs(res - state.arc) ? curr : res
        ),
      }
    case 'isPanning':
      return {
        ...state,
        isPanning: action.value,
      }
    default:
      return state
  }
}
