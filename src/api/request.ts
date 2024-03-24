import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:8082",
  timeout: 5000, // 超时时间
});
service.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
service.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
service.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
service.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
service.defaults.headers.patch['Content-Type'] = 'application/json;charset=utf-8';
service.defaults.headers.patch['Access-Control-Allow-Origin'] = '*';

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = "Bearer " + token
    }
    return config;
  },
  (error) => {
    console.log("请求拦截出错：", error);
  }
);

export default service;