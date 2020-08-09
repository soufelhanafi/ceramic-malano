import actions from "./actions"

const initialState = {
  purchases:[],
  loading:false,
  page: 1,
  size: 25,
  sort: "creationDate",
  order: "desc",
  totalPages:0,
  totalElements:0,
  showAddModal: false,
  showEditModal: false,
  purchaseToEdit:{},
  showDeleteModal: false,
  purchaseToDelete:{},
  loadingInModal:false
}

export default function purchasesReducer(state = initialState, action){
  switch (action.type) {
    case actions.SET_STATE:
      return {...state, ...action.payload}
    default:
      return state
  }
}
