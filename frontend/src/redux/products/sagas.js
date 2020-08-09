import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {message} from "antd"
import * as productApis from "../../services/products"
import actions from "./actions"

const getProductsState = state => state.products

export function* LOAD_PRODUCTS({payload}){
  const {size, page, sort, order, search} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loading: true}
  })
  const response = yield call(productApis.loadProducts,size, page, sort, order, search)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload:{ loading:false,
        products: response.content,
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

export function* ADD_NEW_PRODUCT({payload}){
  const {newProduct} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(productApis.createNewProduct,newProduct)
  if(response){
    const {size, page, sort, order} = yield select(getProductsState)
    message.success('Un nouveau produit a été ajouté avec succés');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:false, showAddModal: false}
    })
    yield put({
      type:actions.LOAD_PRODUCTS,
      payload: {size, page, sort, order}
    })
  }else {
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:true, message:"Une erreur est survenue, veuillez réessayez dans quelques minutes"}
    })
  }
}

export function* UPDATE_PRODUCT({payload}){
  const {productToEdit} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(productApis.updateProduct, productToEdit)
  if(response){
    const {size, page, sort, order} = yield select(getProductsState)
    message.success('Le produit a été mis à jour avec succès');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal: false, showErrorMessage:false, showEditModal: false}
    })
    yield put({
      type:actions.LOAD_PRODUCTS,
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

export function* DELETE_PRODUCT({payload}){
  const {productToDelete} = yield select(getProductsState)
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(productApis.deleteProduct, productToDelete)
  if(response){
    const {size, page, sort, order} = yield select(getProductsState)
    message.success('le produit a été supprimé avec succès');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal: false, showErrorMessage:false, showDeleteModal: false}
    })
    yield put({
      type:actions.LOAD_PRODUCTS,
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

export function* ADD_CATEGORY({payload}){
  const {newCat} = payload
  yield put({
    type: actions.SET_STATE,
    payload: {loadingInModal:true}
  })
  const response = yield call(productApis.createNewCat, newCat)
  if(response){
    message.success('Un nouvelle catégorie a été ajoutée avec succés');
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:false, showAddCategoryModal: false}
    })
    yield put({
      type:actions.LOAD_CATEGORIES,
    })
  }else {
    yield put({
      type: actions.SET_STATE,
      payload: {loadingInModal:false, showErrorMessage:true, message:"Une erreur est survenue, veuillez réessayez dans quelques minutes"}
    })
  }
}

export function* LOAD_CATEGORIES(){
  yield put({
    type: actions.SET_STATE,
    payload: {loading: true}
  })
  const response = yield call(productApis.loadCategories)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload:{ loading:false, categories: response}
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload:{ loading:false }
    })
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_PRODUCTS, LOAD_PRODUCTS),
    takeEvery(actions.ADD_NEW_PRODUCT, ADD_NEW_PRODUCT),
    takeEvery(actions.UPDATE_PRODUCT, UPDATE_PRODUCT),
    takeEvery(actions.DELETE_PRODUCT, DELETE_PRODUCT),
    takeEvery(actions.ADD_CATEGORY, ADD_CATEGORY),
    takeEvery(actions.LOAD_CATEGORIES, LOAD_CATEGORIES),
  ])
}
