import { combineReducers } from 'redux'
import clients from "./clients/reducer"
import users from "./users/reducer"
import products from "./products/reducer"
import purchases from "./purchase/reducer"
const combineR = combineReducers({
  clients,
  users,
  products,
  purchases,
})

export default combineR
