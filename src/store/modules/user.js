import { getLoginMess, cityList, areaList, schList, gradeList,subList } from '@/api/base'
// import {basic_api_url} from '@/api/axios'
const user = {
    state: {
        basic_static:"https://static.mskzkt.jse.edu.cn/resource/v1/",//静态资源
        basic_api_url:"https://mskzkt.jse.edu.cn/baseApi",  //正式地址
        // basic_api_url:"https://mskzkt.tqxxkj.cn/baseApi",  //测试地址
        login_mess:{},  //登录信息
        city_list:[],   //市列表
        area_list:[],   //区列表
        sch_list:[],    //校列表
        grade_list:[],   //年级列表
        sub_list:[],    //学科列表
    },
    mutations: {
        //设置公共域名连接
        basic_static: (state, obj) => {
            state.basic_static = obj;
        },
        //设置公共域名连接
        basic_api_url: (state, obj) => {
            state.basic_api_url = obj;
        },
        // 登录信息
        set_login_mess:(state, obj) => {
            state.login_mess = obj
        },
        get_city_list:(state, arr) => {
            state.city_list = arr
        },
        get_area_list:(state, arr) => {
            state.area_list = arr
        },
        get_sch_list:(state, arr) => {
            state.sch_list = arr
        },
        get_grade_list:(state, arr) => {
            state.grade_list = arr
        },
        get_sub_list:(state, arr) => {
            state.sub_list = arr
        },
        clear_sch:(state) => {
            state.sch_list = []
        },
        clear_area:(state) => {
            state.area_list = []
        }
    },
    actions: {
        // 获取用户登录信息
        async SetLoginMess(context){
            let res = await getLoginMess();
            if(res.state == 41001){
                throw Error('未登录');  
            }
            context.commit('set_login_mess', res.data);
        },
        // 获取市列表
        async GetCityList(context,data){
            let res = await cityList({is_js:data.is_js});
            res.data.city_list.unshift({city_id:0,city_title:'全部市'});
            if(res){
                context.commit('get_city_list',res.data.city_list)
            }
        },
        // 获取区列表
        async GetAreaList(context,data){
            let res = await areaList({city_id:data.city_id,is_edu:data.is_edu});
            res.data.area_list.unshift({area_id:0,area_title:'全部区'})
            if(res){
                context.commit('get_area_list',res.data.area_list)
            }
        },
        // 获取校列表
        async GetSchList(context,data){
            let res = await schList({area_id:data.area_id,page:data.page,limit:data.limit,title:data.title});
            if(data.page == 1){
                res.data.school_list.unshift({
                    school_id:'0',
                    school_title:'全部学校'
                })
            }
            if(res){
                context.commit('get_sch_list',res.data.school_list)
            }
        },
        // 获取年级列表
        async GetGradeList(context,data){
            let res = await gradeList({stage:data.stage});
            res.data.grade_list.unshift({
                grade_id:'0',
                grade_title:'全部'
            })
            if(res){
                context.commit('get_grade_list',res.data.grade_list)
            }
        },
        //获取学科列表
        async getSubList(context,data){
            let res=await subList({stage_id:data.stage_id})
            if(res){
                context.commit('get_sub_list',res.data.subject_list)
            }
        }
    },
    modules: {
    }
}
export default user;
