import actions from "./actions"

const initialState = {
  user:{},
  authorized: false,
  loading: false,
}

export default function usersReducer(state = initialState, action){
  switch (action.type) {
    case actions.SET_STATE:
      return {...state, ...action.payload}
    default:
      return state
  }
}
