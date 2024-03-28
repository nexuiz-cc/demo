import request from './request';

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

export function changeMode(id:number,display:string){
  let url = '/users/'+id
  return request.patch(url,{display:display});
}
