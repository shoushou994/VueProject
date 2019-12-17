import Msite from '../pages/msite/Msite.vue'
import Search from '../pages/search/Search.vue'
import Order from '../pages/order/Order.vue'
import Profile from '../pages/profile/Profile.vue'
import Login from '../pages/login/Login.vue'
import Shop from '../pages/shop/Shop.vue'
import Goods from '../pages/shop/Goods.vue'
import Ratings from '../pages/shop/Ratings.vue'
import Info from '../pages/shop/Info.vue'


export default [
    {
        path: '/msite',
        component: Msite,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/shop',
        component: Shop,
        children:[
            {
                path: '/shop/goods',
                component: Goods
            },
            {
                path: '/shop/ratings',
                component: Ratings
            },
            {
                path: '/shop/info',
                component: Info
            },
            {
                path:'',
                redirect:'/shop/goods'
            }
        ]
    },
    
    {
        path: '/',
        redirect: '/msite'
    },
]