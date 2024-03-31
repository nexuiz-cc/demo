import request from './request';
import type { User } from '../pages/user/makeData';
export function login() {
  return request({
    url: '/users',
    method: 'GET',
  });
}
export function getUsers() {
  return request({
    url: '/users',
    method: 'GET',
  });
}


export function updateUser(userId:string,userInfo:User){
  let url = '/users/'+userId
  return request.patch(url,{ 
    username: userInfo.username,
  password: userInfo.password,
  firstName: userInfo.firstName,
  lastName: userInfo.lastName,
  email: userInfo.email,
  state: userInfo.state,
   role: userInfo.role,
   display:userInfo.display
});
}
export function changeMode(id:number,display:string){
  let url = '/users/'+id
  return request.patch(url,{display:display});
}
