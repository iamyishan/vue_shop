import {request} from "./request";


export function getMenuArray() {
  return request({
    url: '/menus',
    method:'get'
  })
}

//获取userlist
export function getUserArray(data) {
  return request({
    url: '/users',
    params:data
  })
}


//修改用户状态信息
export function updateUserState (url) {
  return request({
    url: url,
    method:'put'
  })
}

//添加用户信息
export function addUser (data) {
  return request({
    url:"/users" ,
    method:'post',
    data:data
  })
}

//根据 ID 查询用户信息
export function getUser (id) {
  return request({
    url:"/users/"+id ,
    method:'get'
  })
}


//根据 ID 修改用户信息
export function editUser (data) {
  return request({
    url:"/users/"+data.id ,
    method:'put',
    data:data
  })
}

//根据 ID 删除用户信息
export function deleteUser (id) {
  return request({
    url:"/users/"+id ,
    method:'delete',
  })
}



