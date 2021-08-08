import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';
import { setTitle } from '@/util'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect:'/dyonline/sumAnswer',
        children:[
            {
                path: 'network/otherOpen',//网络端数据大屏跳转_已在其他页面打开
                name: 'network/otherOpen',
                component: () => import('../components/otherOpen.vue'),
                meta:{
                    title:'网络端数据大屏跳转',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: 'statistic/otherOpen',//注册数据大屏跳转_已在其他页面打开
                name: 'statistic/otherOpen',
                component: () => import('../components/otherOpen.vue'),
                meta:{
                    title:'注册数据大屏跳转',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/dyonline/sumAnswer',//在线答疑-总体答疑
                name: '/dyonline/sumAnswer',
                component: () => import('../views/dyonline/sumAnswer.vue'),
                meta:{
                    title:'在线答疑_教师答疑',
                    // keepAlive:true,
                    // isUseCache:false,
                }
            },  
            {
                path: '/dyonline/stuQuestion',//在线答疑-学生提问
                name: '/dyonline/stuQuestion',
                component: () => import('../views/dyonline/stuQuestion.vue'),
                meta:{
                    title:'在线答疑_学生提问',
                    keepAlive:true,
                    isUseCache:false,
                }
            },
            {
                path: '/dyonline/teaAnswer',//在线答疑-教师答疑
                name: '/dyonline/teaAnswer',
                component: () => import('../views/dyonline/teaAnswer.vue'),
                meta:{
                    title:'在线答疑_教师答疑',
                    keepAlive:true,
                    isUseCache:false,
                }
            },  
            {
                path: '/dyonline/stuDetail/:searchForm',//在线答疑_答疑情况统计表
                name: '/dyonline/stuDetail',
                component: () => import('../views/dyonline/stuDetail.vue'),
                meta:{
                    title:'在线答疑_学生详情',
                    keepAlive:true,
                    isUseCache:true,
                }
            }, 
            {
                path: '/dyonline/teaDetail/:searchForm',//在线答疑_答疑情况统计表
                name: '/dyonline/teaDetail',
                component: () => import('../views/dyonline/teaDetail.vue'),
                meta:{
                    title:'在线答疑_教师详情',
                    keepAlive:true,
                    isUseCache:true,
                }
            }, 
            {
                path: '/tbkt/courseResource',//同步课堂_课程资源
                name: '/tbkt/courseResource',
                component: () => import('../views/tbkt/courseResource.vue'),
                meta:{
                    title:'同步课堂_资源观看',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/tbkt/questionState',//同步课堂_答题情况
                name: '/tbkt/questionState',
                component: () => import('../views/tbkt/questionState.vue'),
                meta:{
                    title:'同步课堂_答题情况',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/tbkt/viewDetail/:searchForm',//同步课堂_资源浏览量统计表
                name: '/tbkt/viewDetail',
                component: () => import('../views/tbkt/viewDetail.vue'),
                meta:{
                    title:'同步课堂_资源浏览量统计表',
                    keepAlive:true,
                    isUseCache:true,
                }
            }, 
            {
                path: '/tbkt/stateDetail/:searchForm',//同步课堂_答题情况统计表
                name: '/tbkt/stateDetail',
                component: () => import('../views/tbkt/stateDetail.vue'),
                meta:{
                    title:'同步课堂_答题情况统计表',
                    keepAlive:true,
                    isUseCache:true,
                }
            },
            {
                path: '/jzkt/jzktResource',//家长课堂_视频资源
                name: '/jzkt/jzktResource',
                component: () => import('../views/jzkt/jzktResource.vue'),
                meta:{
                    title:'家长课堂 ',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/jzkt/detail/:searchForm',//家长课堂_资源统计表
                name: '/jzkt/detail',
                component: () => import('../views/jzkt/detail.vue'),
                meta:{
                    title:'家长课堂_资源统计表',
                    keepAlive:true,
                    isUseCache:true,
                }
            },
            {
                path: '/msjt/msjtResource',//名师讲堂
                name: '/msjt/msjtResource',
                component: () => import('../views/msjt/msjtResource.vue'),
                meta:{
                    title:'名师讲堂',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/msjt/detail/:searchForm',//名师讲堂_详情
                name: '/msjt/detail',
                component: () => import('../views/msjt/detail.vue'),
                meta:{
                    title:'名师讲堂_详情',
                    keepAlive:true,
                    isUseCache:true,
                }
            },
            {
                path: '/kyzx/kyzxResource',//抗议助学
                name: '/kyzx/kyzxResource',
                component: () => import('../views/kyzx/kyzxResource.vue'),
                meta:{
                    title:'抗议助学',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/kyzx/detail/:searchForm',//抗议助学_详情
                name: '/kyzx/detail',
                component: () => import('../views/kyzx/detail.vue'),
                meta:{
                    title:'抗议助学_详情',
                    keepAlive:true,
                    isUseCache:true,
                }
            },
            {
                path: '/hdkt/hdktResource',//互动课堂
                name: '/hdkt/hdktResource',
                component: () => import('../views/hdkt/hdktResource.vue'),
                meta:{
                    title:'互动课堂',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/hdkt/detail/:searchForm',//互动课堂_详情
                name: '/hdkt/detail',
                component: () => import('../views/hdkt/detail.vue'),
                meta:{
                    title:'互动课堂_详情',
                    keepAlive:true,
                    isUseCache:true,
                }
            },
            {
                path: '/seyk/seykResource',//苏E优课
                name: '/seyk/seykResource',
                component: () => import('../views/seyk/seykResource.vue'),
                meta:{
                    title:'苏E优课',
                    keepAlive:true,
                    isUseCache:false,
                }
            }, 
            {
                path: '/seyk/detail/:searchForm',//苏E优课_详情
                name: '/seyk/detail',
                component: () => import('../views/seyk/detail.vue'),
                meta:{
                    title:'苏E优课_详情',
                    keepAlive:true,
                    isUseCache:true,
                }
            },
        ]
    },
    {
        path: '/statistic',//注册数据大屏
        name: 'statistic',
        component: () => import('../views/statistic/statistic.vue'),
        meta:{
            title:'注册数据大屏',
        }
    },
    {
        path: '/network',//网络端数据大屏
        name: 'network',
        component: () => import('../views/network/network.vue'),
        meta:{
            title:'网络端数据大屏',
        }
    },
]

const router = new VueRouter({
    routes
})
router.beforeEach(async(to, form, next)=>{
    if(to.path != '/network'){
        try {
            await store.dispatch('SetLoginMess');
        }catch(e){
            console.warn(e)
        }
    }
    to.meta.title && setTitle(to.meta.title);
    next()
})
export default router
