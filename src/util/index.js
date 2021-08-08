/**
 * 获取今天的日期
 */
export const getdate = () => {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var sp='/';
    return year+sp+mon+sp+date+sp;
}
/**
 * 获取随机数
 */
export const randomString = (len, charSet) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
export const setTitle = (title) => {
    document.title = title || '江苏省名师空中课堂'
}