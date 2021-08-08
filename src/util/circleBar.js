/*@desc:圆形柱状图——y轴 */
import * as echarts from 'echarts';

export default {
    getCircleBar(el, value,unit,percent) {
        var myChart = echarts.init(document.getElementById(el));

        // var dom = document.getElementById('echarts')
        window.addEventListener('resize', function () {
            myChart.resize()
        })
        let y_value = []
        value.forEach(item => {
            y_value.push(item + unit)
        })
        let y_percent = []
        percent.forEach(item => {
            y_percent.push(item + '%')
        })
        var salvProName =["同步课堂","苏e优课","家长课堂","名师讲堂","抗疫助学","互动课堂"];
        var salvProValue =[239,181,154,144,135,117];
        var salvProPercent =['10%','20%','30%','40%','50%','40%'];
        var salvProMax =[];//背景按最大值
        let maxData = 0
        value.forEach(item => {
            maxData += Number(item);
        })

        for (let i = 0; i < value.length; i++) {
            salvProMax.push(maxData)
        }
        // let a = Math.max(...value)

        var option = {
            legend: {
                show:true,
                data: ['各模块累计点播量'],
                right:20,
                icon: "circle",
                itemWidth: 10,
                textStyle:{
                    color:'#fff',
                    
                    // borderType:'dotted'
                },
                // padding:[0,0,5,0]
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '2%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                backgroundColor:'rgba(25, 25, 30, 0.7)',
                transitionDuration:0,
                borderWidth:'0',
                textStyle:{
                    color:'#fff'
                },
                formatter: function(params) {
                    return params[0].name  + ' : ' + params[0].value + unit
                }
            },
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: salvProName
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#31FBFB',
                        fontSize: '12',
                        // padding:[0,0,0,15]
                    },
                },
                // formatter:'{value}{unit}',
                
                data:y_value
            },{
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#30707D',
                        fontSize: '12',
                        padding:[0,0,0,50]
                    },
                },
                data:y_percent
            }],
            series: [{
                    name: '各模块累计点播量',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#7849EA'
                            }, {
                                offset: 1,
                                color: '#47D8F1'
                            }]),
                        },
                    },
                    // label: {
                    //     show: true, //开启显示
                    //     position: 'right', 
                    //     color: '#31FBFB',
                    //     fontSize: 12,
                    //     formatter:'{c}',
                    // },
                    barWidth: 12,
                    data: value
                },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: 12,
                    barGap: '-100%',
                    data: salvProMax,
                    itemStyle: {
                        normal: {
                            color: 'rgba(24,31,68,1)',
                            barBorderRadius: 30,
                        }
                    },
                },
            ]
        };

        myChart.setOption(option);
    },
}

