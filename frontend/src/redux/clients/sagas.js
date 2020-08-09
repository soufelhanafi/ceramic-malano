import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {message} from "antd"
import * as clientApis from "../../services/clients"
import actions from "./actions"

const getClientsState = state => state.clients

export function* LOAD_CLIENTS({payload}){
  const {size, page, sort, order, search} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loading: true}
  })
  const response = yield call(clientApis.loadClients,size, page, sort, order, search)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload:{ loading:false,
        clients: response.content,
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

export function* ADD_NEW_CLIENT({payload}){
  const {newClient} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(clientApis.createNewClinet,newClient)
  if(response){
    const {size, page, sort, order} = yield select(getClientsState)
    message.success('Un nouveau client a été ajouté avec succés');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:false, showAddModal: false}
    })
    yield put({
      type:actions.LOAD_CLIENTS,
      payload: {size, page, sort, order}
    })
  }else {
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:true, message:"Une erreur est survenue, veuillez réessayez dans quelques minutes"}
    })
  }
}

export function* UPDATE_CLIENT({payload}){
  const {clientToEdit} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(clientApis.updateClient, clientToEdit)
  if(response){
    const {size, page, sort, order} = yield select(getClientsState)
    message.success('Le client a été mis à jour avec succès');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal: false, showErrorMessage:false, showEditModal: false}
    })
    yield put({
      type:actions.LOAD_CLIENTS,
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

export function* DELETE_CLIENT({payload}){
  const {clientToDelete} = yield select(getClientsState)
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(clientApis.deleteClient, clientToDelete)
  if(response){
    const {size, page, sort, order} = yield select(getClientsState)
    message.success('le client a été supprimé avec succès');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal: false, showErrorMessage:false, showDeleteModal: false}
    })
    yield put({
      type:actions.LOAD_CLIENTS,
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
    takeEvery(actions.LOAD_CLIENTS, LOAD_CLIENTS),
    takeEvery(actions.ADD_NEW_CLIENT, ADD_NEW_CLIENT),
    takeEvery(actions.UPDATE_CLIENT, UPDATE_CLIENT),
    takeEvery(actions.DELETE_CLIENT, DELETE_CLIENT),
  ])
}
