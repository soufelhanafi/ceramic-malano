import actions from "./actions"

const initialState = {
  products:[],
  loading:false,
  page: 1,
  size: 25,
  sort: "creationDate",
  order: "desc",
  totalPages:0,
  totalElements:0,
  showAddModal: false,
  showEditModal: false,
  productToEdit:{},
  showDeleteModal: false,
  productToDelete:{},
  loadingInModal:false,
  categories:[]
}

export default function productsReducer(state = initialState, action){
  switch (action.type) {
    case actions.SET_STATE:
      return {...state, ...action.payload}
    default:
      return state
  }
}
