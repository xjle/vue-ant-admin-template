import Axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'?'portal-admin-api':window.BASE_URL
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export const login = obj=>Axios({method:'post',url:`/${baseUrl}/login/login.do`,data:obj});
// export const resetPassword = obj=>Axios.post('/portal-admin-api/login/forgetPassword.do',obj);
export const logout = ()=>Axios.get(`/${baseUrl}/logout.do`)