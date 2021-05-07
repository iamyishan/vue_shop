import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/Login";

const Home = () => import("../views/home/Home")
const Welcome = () => import("../views/home/child/Welcome")
const User   = () => import("../views/home/child/User")

//() => import(/* webpackChunkName: "about" */ '../views/About.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/login"
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
          {
            path: '',
            redirect:'/welcome'
          },
          {
            path:'/welcome',
            component:Welcome
          },
          { path: '/users', component: User }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转
    if (to.path === '/login') return next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()

})

export default router
