
const getters = {
    basic_static:state => state.user.basic_static,
    basic_api_url:state => state.user.basic_api_url,
    login_mess:state => state.user.login_mess,
    city_list:state => state.user.city_list,
    area_list:state => state.user.area_list,
    sch_list:state => state.user.sch_list,
    grade_list:state => state.user.grade_list,
    sub_list:state => state.user.sub_list
};
export default getters;
