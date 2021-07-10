import Axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'?'mocs-tenant':window.TENANT_URL


export const tenantList = obj => Axios.post(`${baseUrl}/tenant/pageList.do`, obj); // 租户列表
export const systemList = () => Axios.post(`${baseUrl}/system/list.do`); // 系统权限列表
