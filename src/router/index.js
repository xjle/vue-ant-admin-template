import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../layouts/index.vue'),
    beforeEnter:(to, from, next)=>{
      // const isLogin = store.state.isLogin;// 因刷新页面导致isLogin初始化
      const isLogin = localStorage.getItem('isLogin')
      if(isLogin) next()
      else next('/login')
    },
    children: [
      {
        path: 'tenantManage',
        name: 'tenantManage',
        meta:{
          title:'多租户列表'
        },
        component: () => import('../views/tenantManage/index.vue'),
        children:[
          {
            path: 'modifyTenantManage',
            name: 'modifyTenantManage',
            meta: { title: '创建多租户' ,show:true},
            component: () => import('../views/tenantManage/pages/modifyPage.vue')
          },
        ]
      },
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('../views/userManage/index.vue'),
        meta:{
          title:'用户列表'
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: () => import('../views/forgotPassword/index.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/notFound/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 推出登录后无法跳转找回密码页面
// router.beforeEach((to,from,next)=>{
//   if (to.path === '/login') {
//     next()
//   }else{
//     let isLogin = localStorage.getItem('isLogin')
//     if (!isLogin) {
//       console.log(111);
//       next('/login')
//     }else{
//       next()
//     }
//   }
// })
export default router
