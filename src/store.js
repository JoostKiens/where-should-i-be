import { ARCS } from '/constants'

export const initialState = { arc: 0, snapIndex: 0, isPanning: false }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementArc':
      return {
        ...state,
        // normalize arc, always between 0 and 2*Math.PI
        arc: (state.arc + action.value + Math.PI * 2) % (Math.PI * 2),
      }
    case 'snapTo':
      // snapIndex is the index of the array of ARCS to snap to
      return {
        ...state,
        snapIndex: ARCS.reduce(
          (res, curr, index) => {
            return Math.abs(curr - state.arc) < Math.abs(res.arc - state.arc)
              ? { arc: curr, index }
              : res
          },
          { arc: 0, index: 0 }
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
