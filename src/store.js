export const initialState = { arc: 0 }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementArc':
      return {
        ...state,
        // normalize arc, always between 0 and 2*Math.PI
        arc: (state.arc + action.increment + Math.PI * 2) % (Math.PI * 2),
      }
    default:
      return state
  }
}
