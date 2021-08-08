
// import echarts from 'echarts'
import * as echarts from 'echarts';
export default {
    getProgress(el, data, color1, color2, name, font_color) {
        data = data.split('%')[0]

        //当前视口宽度
        let nowClientWidth = document.documentElement.clientWidth;
        // 换算方法

        let nowSize = 16 * (nowClientWidth / 1920);
        let nowSize1 = 14 * (nowClientWidth / 1920);
        let width1 = 20 * (nowClientWidth / 1920);
        let width12 = 82 * (nowClientWidth / 1920);
        let height = 32 * (nowClientWidth / 1920)
        var myChart = echarts.init(document.getElementById(el));
        //echarts自动适应div大小
        window.addEventListener('resize', function () {
            //   nowClientWidth = document.documentElement.clientWidth;
            //   nowSize = 16 * (nowClientWidth / 1920);
            //   nowSize1 = 14 * (nowClientWidth / 1920);
            //   width1 = 20 * (nowClientWidth / 1920);
            //  width12 = 82 * (nowClientWidth / 1920);
            //   height= 32 * (nowClientWidth / 1920)
            myChart.resize();
        })
        var img = '../assets/img/Rectangle6.png'
        var option = {
            grid: {
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
            },

            series: [{
                "name": "仪表盘",
                "type": "gauge",
                "splitNumber": 10,
                radius: '100%',
                "axisLine": {
                    "lineStyle": {
                        "color": [
                            // [0, "#0EC4FD"], //初始值及颜色
                            [data / 100, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0.1,
                                    color: color1.data1
                                },
                                {
                                    offset: 0.7,
                                    color: color1.data2
                                }
                            ])], //渐变值颜色

                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 1,
                                    color: color2.data1
                                }
                            ])] //底层颜色渐变
                        ],
                        "width": width1
                    }
                },
                detail: {
                    offsetCenter: [0, "5%"], //数值的显示位置
                    formatter: '{value}%',
                    // textStyle: { //仪表盘的数值单位及颜色，字体大小的改变
                        fontSize: 1.2 * nowSize,
                        color:font_color,
                        // color: '#fff ',
                        // color: '#29D0FF ',
                        top: '100%',
                    // }
                },
                axisLabel: {
                    show: false,
                },
                "axisTick": {
                    show: false,
                },
                "splitLine": {
                    "show": false,
                },
                "itemStyle": {
                    show: false,
                },
                "title": {
                    "offsetCenter": ['4%', "80%"],
                    // "textStyle": {
                        color: '#FFF',
                        fontSize: 10,
                        rich: {
                            a: {

                                backgroundColor: 'rgba(51, 72, 211, 0.5)',
                                borderRadius: 200,
                                color: '#FFF',
                                fontSize: nowSize,


                                borderWidth: 3,//设置外层边框
                                borderColor: 'rgba(51, 72, 211, 0.5)',
                                shadowColor: '#6094FF',
                                fontSize: nowSize1,
                                width: width12,
                                height: height,
                                // padding: [8, 8, 8, 8]

                            }
                        }
                    // },
                },
                "data": [{
                    "name": '{a|' + name + '} ',
                    "value": data,
                }],
                pointer: {
                    show: false,
                },
            },],
        }
        myChart.clear();
        myChart.setOption(option);
    }




} 