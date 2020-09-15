import axios from "axios"

export function loadPurchases(size, page, sort, order, search){
  return axios({
    method:"get",
    url:"/api/private/purchases",
    params:{
      size, page, sort, order, search
    }
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function createNewPurchase(newPurchase){
  return axios({
    method:"post",
    url:"/api/private/purchases",
    data:newPurchase
  }).then(response=>{
    return response.data
  }).catch((error)=>{
    debugger
    return false
  })
}

export function updatePurchase(purchaseToEdit){
  return axios({
    method:"post",
    url:"/api/private/purchases/update",
    data:purchaseToEdit
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function deletePurchase(purchaseToDelete){
  return axios({
    method:"delete",
    url:"/api/private/purchases/"+purchaseToDelete.id,
  }).then(()=>{
    return true
  }).catch(()=>{
    return false
  })
}

export function getPurchasePdf(purchaseToDelete){
  return axios({
    method:"get",
    url:"/api/public/pdf",
    responseType: 'arraybuffer'
  }).then((response)=>{
    debugger
    return response.data
  }).catch(()=>{
    return false
  })
}
