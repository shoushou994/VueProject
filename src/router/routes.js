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
        name:'shop',
        path: '/shop/:id',
        props: true,
        component: Shop,
        children:[
            {
                path: 'goods',
                component: Goods
            },
            {
                path: 'ratings',
                component: Ratings
            },
            {
                path: 'info',
                component: Info
            },
            {
                path:'',
                redirect:'goods'
            }
        ]
    },
    
    {
        path: '/',
        redirect: '/msite'
    },
]