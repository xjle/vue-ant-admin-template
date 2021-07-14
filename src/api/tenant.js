import Axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'mocs-tenant' : window.TENANT_URL
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
import qs from 'qs'
export const tenantList = obj => Axios.post(`${baseUrl}/tenant/pageList.do`, obj); // 租户列表
export const systemList = () => Axios.post(`${baseUrl}/system/list.do`); // 系统权限列表
export const insertTenant = obj => Axios.post(`${baseUrl}/tenant/insert.do`, obj); // 新建租户
export const updateTenant = obj => Axios.post(`${baseUrl}/tenant/update.do`, obj); // 编辑租户
export const delTenant = obj => Axios.post(`${baseUrl}/tenant/delete.do`, qs.stringify(obj), {
  headers: {
    "Content-Type":
      "application/x-www-form-urlencoded;charset=utf-8",
  },
}); // 删除租户

