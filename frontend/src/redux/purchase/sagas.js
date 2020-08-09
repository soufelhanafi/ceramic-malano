import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {message} from "antd"
import * as purchaseApis from "../../services/purchases"
import actions from "./actions"

const getPurchasesState = state => state.purchases

export function* LOAD_PURCHASES({payload}){
  const {size, page, sort, order, search} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loading: true}
  })
  const response = yield call(purchaseApis.loadPurchases,size, page, sort, order, search)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload:{ loading:false,
        purchases: response.content,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size, page, sort, order }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload:{ loading:false }
    })
  }
}

export function* ADD_NEW_PURCHASE({payload}){
  const {newPurchase} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(purchaseApis.createNewPurchase,newPurchase)
  if(response){
    const {size, page, sort, order} = yield select(getPurchasesState)
    message.success('Un nouveau purchase a été ajouté avec succés');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:false, showAddModal: false}
    })
    yield put({
      type:actions.LOAD_PURCHASES,
      payload: {size, page, sort, order}
    })
  }else {
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:true, message:"Une erreur est survenue, veuillez réessayez dans quelques minutes"}
    })
  }
}

export function* UPDATE_PURCHASE({payload}){
  const {purchaseToEdit} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(purchaseApis.updatePurchase, purchaseToEdit)
  if(response){
    const {size, page, sort, order} = yield select(getPurchasesState)
    message.success('Le purchase a été mis à jour avec succès');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal: false, showErrorMessage:false, showEditModal: false}
    })
    yield put({
      type:actions.LOAD_PURCHASES,
      payload: {size, page, sort, order}
    })
  }else {
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showEditModal: false }
    })
    message.error('Une erreur est survenue, veuillez réessayez dans quelques minutes');
  }
}

export function* DELETE_PURCHASE({payload}){
  const {purchaseToDelete} = yield select(getPurchasesState)
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(purchaseApis.deletePurchase, purchaseToDelete)
  if(response){
    const {size, page, sort, order} = yield select(getPurchasesState)
    message.success('le purchase a été supprimé avec succès');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal: false, showErrorMessage:false, showDeleteModal: false}
    })
    yield put({
      type:actions.LOAD_PURCHASES,
      payload: {size, page, sort, order}
    })
  }else {
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showDeleteModal: false }
    })
    message.error('Une erreur est survenue, veuillez réessayez dans quelques minutes');
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_PURCHASES, LOAD_PURCHASES),
    takeEvery(actions.ADD_NEW_PURCHASE, ADD_NEW_PURCHASE),
    takeEvery(actions.UPDATE_PURCHASE, UPDATE_PURCHASE),
    takeEvery(actions.DELETE_PURCHASE, DELETE_PURCHASE),
  ])
}
