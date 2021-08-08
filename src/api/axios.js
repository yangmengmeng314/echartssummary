import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'

axios.defaults.baseURL = 'https://mskzkt.jse.edu.cn/baseApi'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [
    function (data) {
        return qs.stringify(data)
    }
]

var domain_static = ""  //线上域名
// var basic_api_url = "https://mskzkt.tqxxkj.cn/baseApi"   //测试接口
var basic_api_url = 'https://mskzkt.jse.edu.cn/baseApi'  //线上接口

const ajax = axios.create({
    baseURL: basic_api_url,
    withCredentials:true,
    timeout:50000
})
// 发送请求时处理，统一加上token
ajax.interceptors.request.use( config => {
    if(!config.data){
        config.data = {}
    }
    let url = window.location.href;
    let api_token = '';
    if (url.indexOf("api_token") != -1) {
        api_token = url.split('api_token=')[1];
        config.data.api_token = decodeURIComponent(api_token);
    }else if(localStorage.getItem('screen_token')){
        config.data.api_token = localStorage.getItem('screen_token')
    }
    // config.data.api_token = '2e29KRVo0oce08//VmaTngs/7tlkYbqTyIRPGsqgyxUV5w3oqJXuxa+mm/VKzA9KehdiBn7/qSYoY4ul3r/Z97ck'   //测试省级
    // config.data.api_token = '152eGALKHXd2QEPWJeMRp4+66AQbuJB+BZPXz1YS5HcZg/uS5HgO39unI5slHc4JyJXT1zgP70LgNSeNrchaYUVc'  //线上省级
    // 152eGALKHXd2QEPWJeMRp4%2B66AQbuJB%2BBZPXz1YS5HcZg%2FuS5HgO39unI5slHc4JyJXT1zgP70LgNSeNrchaYUVc   线上省级转码后地址
    // config.data.api_token = 'd4530/lho+KAfxouu1EXsM0zov0aERTwL79905x+JNsWW+8+3OlIOjQJu/kf8K9SNaCutQ4glX1P01N+ynd7KpOUmg'   //市级
    // config.data.api_token = 'bfec8Ha7JlZkix10+EDvmIo1GHtt/9Zjj7ZOF0I6Hpik3eGnNWeMh9LA8BOnba3tzyIrCk/5kCykNJqTn7EvhKCZNQ'   //线上市级
    // bfec8Ha7JlZkix10%2BEDvmIo1GHtt%2F9Zjj7ZOF0I6Hpik3eGnNWeMh9LA8BOnba3tzyIrCk%2F5kCykNJqTn7EvhKCZNQ  线上市级转码后token
    // config.data.api_token = '6417UR4QZjxrJOE08+faAHLfFmYWEoWWs0cHyRhg714gcSNdq8TS5iTFzkoji+syKutSb6eVr6KqJlfAzs5rp9U'   //区级
    // config.data.api_token = 'b970nRA2ve/fU55P/XOgtto2XQwmlU4HnDv1Qiw6bsazwghLEKM/3Z9+i7fpraDX1owDGR9mviLW4fWmzmzQ/Fc'   //线上区级
    // b970nRA2ve%2FfU55P%2FXOgtto2XQwmlU4HnDv1Qiw6bsazwghLEKM%2F3Z9%2Bi7fpraDX1owDGR9mviLW4fWmzmzQ%2FFc  线上区级转码后地址
    // config.data.api_token = '0216YFIaGa/WZJzewyZvk07Mn+53Wkvy4YjyDy49343M4qyGOV7W6qX8bjndSzuxk7VlSZAiRXrzSSXPzzTDLIKx2rY'  //校级
    // config.data.api_token = '64806/Qo2VZqjRimSz+Up2cs5CEhATVpHBFkgo06ZGvPT39FVFFZ4c+7fBCoCnkwLSDpqFMzHPnvyGknsd+M/e/O5mM'  //线上校级
    // 64806%2FQo2VZqjRimSz%2BUp2cs5CEhATVpHBFkgo06ZGvPT39FVFFZ4c%2B7fBCoCnkwLSDpqFMzHPnvyGknsd%2BM%2Fe%2FO5mM  线上校级转码后地址
    return config
},err => {
    return Promise.reject(err)
})

ajax.interceptors.response.use(res => {
    if(res.data.state == 0){
        const { data } = res;
        return data;
    }else if(res.data.state == 41001){
        localStorage.removeItem('screen_token');
        window.location.replace('https://mskzkt.jse.edu.cn/baseApi/screen/third_wework/');
    }else{
        Message.error(res.data.message)
    }
},err => {
    return Promise.reject(err)
})

export default ajax