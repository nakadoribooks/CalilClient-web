import {LibraryListLoadAction, LibraryListFailLoadAction, LibraryListLoadedAction} from '../action/actions/Actions.js'
import initialState from '../state/AppState.js'

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case LibraryListLoadAction.type:
      return Object.assign({}, state, {
        isLoading: true,
        errorMessage: null
      })
    case LibraryListFailLoadAction.type:
      return Object.assign({}, state, {
        isLoading: true,
        errorMessage: "通信に失敗しました"
      })
    case LibraryListLoadedAction.type:
      return Object.assign({}, state, {
        isLoading: false,
        libraryList: action.libraryList,
        errorMessage: null
      })
    default:
      return state
  }

}
