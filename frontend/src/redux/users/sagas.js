import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import * as userApis from "../../services/users"
import actions from "./actions"
import Cookies from 'universal-cookie'

export function* LOGIN({payload}){
  yield put({
    type:actions.SET_STATE,
    payload:{ loading: false}
  })
  const {email, password} = payload
  const response = yield call(userApis.login, email, password);
  if(response){
    const cookies = new Cookies()
    cookies.set("x-auth-token", response["x-auth-token"],{
      maxAge:60 * 59,
      expires: response.expiresDate
    })
    yield put({
      type:actions.SET_STATE,
      payload:{ loading: false }
    })
    window.location.reload(true)
  }else{
    yield put({
      type:actions.SET_STATE,
      payload:{ loading: false, showErrorMessage:true, message:"Email/mot de passe incorrect" }
    })
  }
}

export function* LOAD_CURRENT_USER(){
  yield put({
    type: actions.SET_STATE,
    payload: {loadingCurrentUser: true}
  })
  const response = yield call(userApis.loadCurrentUser)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload:{ loadingCurrentUser:false, authorized: true, user: response }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload:{ loadingCurrentUser:false, authorized: false }
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    LOAD_CURRENT_USER()
  ])
}
