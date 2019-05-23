export const initialState = { angle: 0 }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementAngle':
      return {
        ...state,
        // normalize angle, always between 0 and 2*Math.PI
        angle: (state.angle + action.increment + Math.PI * 2) % (Math.PI * 2),
      }
    default:
      return state
  }
}
