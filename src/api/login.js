import Axios from 'axios';
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export const login = obj=>Axios({method:'post',url:'/portal-admin-api/login/login.do',data:obj});
// export const resetPassword = obj=>Axios.post('/portal-admin-api/login/forgetPassword.do',obj);
export const logout = ()=>Axios.get('/portal-admin-api/logout.do')