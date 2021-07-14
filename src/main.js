import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/style.css'
import './plugins/ant-design-vue.js'
import { fun } from './utils/public'
import rsaUtil from './utils/rsaUtil'
import showConfirm from '@/utils/showConfirm'
import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css' // Progress 进度条样式
Nprogress.configure({
  showSpinner: false
}, {
  ease: 'ease',
  speed: 600
});
import { message} from 'ant-design-vue';
Vue.config.productionTip = false
Vue.prototype.$msg = message;
Vue.prototype.$rsaUtil = rsaUtil; //rsa加密
Vue.prototype.$showConfirm = showConfirm; //显示确认框方法
fun(document, window);
// axios设置
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
//判断是否在登录状态

if (store && store.state) {
  // 暂时不判断环境
  // if (process.env.NODE_ENV === 'development') {
  //   store.commit('SET_IMGURL', 'https://204.szlanyou.com')
  //   console.log(store.state.imgUrl);
  // } else {
  //   store.commit('SET_IMGURL', 'https://204.szlanyou.com')
  // }
  //拦截请求
  axios.interceptors.request.use(config => {
    Nprogress.start();// 加载条
    store.dispatch('SET_SPINNING', true); // loding
    return config
  }, error => {

  });
  // //拦截响应
  axios.interceptors.response.use(config => {
    const isLogin = localStorage.getItem('isLogin');
    // 判断条件未知，猜测无权限
    if (config.data.code === 'C0105' || config.data.code === 'C0106' || config.data.code === 'A500') {
      if (isLogin) {
        localStorage.removeItem('isLogin');
        store.commit('SET_ISLOGIN',false);
      }
      router.push('/login');

    } else {
      store.commit('SET_ISLOGIN',true)
      localStorage.setItem('isLogin', true); //设置登录状态
    }
    store.dispatch('SET_SPINNING', false); //关闭loading遮罩
    Nprogress.done();
    return config
  }, error => {
    setTimeout(() => {
      store.dispatch('SET_SPINNING', false);
    }, 5000)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
