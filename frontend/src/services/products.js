import axios from "axios"

export function loadProducts(size, page, sort, order, search){
  return axios({
    method:"get",
    url:"/api/private/products",
    params:{
      size, page, sort, order, search
    }
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function createNewProduct(newProduct){
  return axios({
    method:"post",
    url:"/api/private/products",
    data:newProduct
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function updateProduct(productToEdit){
  return axios({
    method:"put",
    url:"/api/private/products",
    data:productToEdit
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function deleteProduct(productToDelete){
  return axios({
    method:"delete",
    url:"/api/private/products/"+productToDelete.id,
  }).then(()=>{
    return true
  }).catch(()=>{
    return false
  })
}

export function createNewCat(newCat){
  return axios({
    method:"post",
    url:"/api/private/categories",
    data: newCat
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}
export function loadCategories(){
  return axios({
    method:"get",
    url:"/api/private/categories",
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}
