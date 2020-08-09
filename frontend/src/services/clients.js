import axios from "axios"

export function loadClients(size, page, sort, order, search){
  return axios({
    method:"get",
    url:"/api/private/clients",
    params:{
      size, page, sort, order, search
    }
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function createNewClinet(newClient){
  return axios({
    method:"post",
    url:"/api/private/clients",
    data:newClient
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function updateClient(clientToEdit){
  return axios({
    method:"post",
    url:"/api/private/clients/update",
    data:clientToEdit
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function deleteClient(clientToDelete){
  return axios({
    method:"delete",
    url:"/api/private/clients/"+clientToDelete.id,
  }).then(()=>{
    return true
  }).catch(()=>{
    return false
  })
}
