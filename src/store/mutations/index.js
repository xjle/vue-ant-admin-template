export default {
  SET_ISLOGIN: (state, payload) => {
    state.isLogin = payload;
  },
  SET_USERINFO:(state,payload)=>{
    state.userInfo = payload;
  },
  SET_SPINNING: (state, payload) => {
    state.spinning = payload;
  },
}
