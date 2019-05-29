// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
import { ARCS } from '/constants'
import { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext()
const initialState = { arc: 0, selectedIndex: 364 }

function reducer(state, action) {
  switch (action.type) {
    case 'incrementArc':
      return {
        ...state,
        // normalize arc, always between 0 and 2*Math.PI
        arc: (state.arc + action.value + Math.PI * 2) % (Math.PI * 2),
      }
    case 'snapTo':
      const { index: arcIndex } = ARCS.reduce(
        (res, curr, index) => {
          return Math.abs(curr - state.arc) < Math.abs(res.arc - state.arc)
            ? { arc: curr, index }
            : res
        },
        { arc: 0, index: 364 }
      )

      return {
        ...state,
        selectedIndex: arcIndex,
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

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
)
export const useStoreValue = () => useContext(StoreContext)
