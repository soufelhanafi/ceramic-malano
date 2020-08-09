import axios from "axios"

export function loadCurrentUser(){
  return axios({
    method:"get",
    url:"/api/private/accounts",
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}

export function login(email, password){
  return axios({
    method:"post",
    url:"/api/public/login",
    data:{email, password}
  }).then(response=>{
    return response.data
  }).catch(()=>{
    return false
  })
}
