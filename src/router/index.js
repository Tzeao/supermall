import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('views/home/Home.vue')

const Category = () =>
    import ('views/category/Category.vue')

const Cart = () =>
    import ('views/cart/Cart.vue')

const Profile = () =>
    import ('views/profile/Profile.vue')
const Detail = () =>
    import ('views/detail/Detail.vue')

Vue.use(VueRouter)
    // 导航重复
    //获取原型对象上的replace函数
const originalReplace = VueRouter.prototype.replace
    //修改原型对象中的replace方法
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

const routes = [{
        path: '/',
        name: 'Home',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router