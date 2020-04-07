import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { loadState, saveState } from '../utils/localStorage'
import throttle from 'lodash.throttle'

const defaultState = {
  videos: [],
  playingVideo: {
    id: null
  }
}

export default (initialState) => {
  if (initialState === undefined) {
    const state = loadState()
    initialState = {
      ...defaultState,
      ...state
    }
  }

  const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000))

  return store
}
