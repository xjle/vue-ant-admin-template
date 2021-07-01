
export default {
  LoginResult({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      if (true) {
        console.log('登录接口返回token保存在localstore');
        commit('SET_TOKEN', 'token')
      }
      resolve('登录接口返回得值')
    }).catch(error => {
      reject(error)
    })
  }
}
