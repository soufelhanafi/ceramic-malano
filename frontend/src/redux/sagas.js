import { all } from 'redux-saga/effects'
import user from './users/sagas'
import clients from "./clients/sagas"
import products from "./products/sagas"
import purchases from "./purchase/sagas"

export default function* rootSaga() {
  yield all([
    user(),
    clients(),
    products(),
    purchases()
  ])
}
