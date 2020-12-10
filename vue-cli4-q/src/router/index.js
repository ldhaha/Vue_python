import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Com from '@/views/com.vue'
import Test2 from '@/components/test2.vue'
import Test3 from '@/components/test3.vue'
import Test4 from '@/components/test4.vue'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "home",
    component: Login
  },
  {
    path: "/index",
    component: Index,
    redirect:"/index/com",
    children:[
      {
        // 加了斜杠就是根路径
        path:'com',
        component:resolve => require(['@/views/com.vue'], resolve)
      },
      {
        path:'test2',
        component:Test2
      },
      {
        path:'test3',
        component:Test3
      },
      {
        path:'test4',
        component:Test4
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* 进行全局路由拦截，token判断
登录页面则直接跳转,否则则需要进行
token的判断
*/
router.beforeEach((to, from, next) => {
      let token = localStorage.getItem("token")
      if (to.path != '/' && !token) {
        next({
          path: '/'
        })
      } else {
        next()
      }
}
)
    export default router
