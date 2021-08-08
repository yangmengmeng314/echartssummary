/*@desc:折线图图 */
import * as echarts from 'echarts';

export default {
    getLine(el,line_value) {
        var myChart = echarts.init(document.getElementById(el));
        window.addEventListener('resize', function () {
            myChart.resize()
        })
        var option = {
            legend: {
                show:true,
                data: ['市级平台总访问量' ,'市级平台总点播量'],
                right:20,
                icon: "circle",
                itemWidth: 10,
                textStyle:{
                    color:'#fff',
                    // borderType:'dotted'
                }
            },
            color:['#4192FF','#31FBFB'],
            tooltip: {
                trigger: 'axis',
                borderWidth:'0',
                backgroundColor:'rgba(25, 25, 30, 0.7)',
                formatter:function(params){
                    return params[1].name + "<br>" + params[1].marker + '总访问量：' +params[1].data + line_value.unit + '人' + "<br>" + params[0].marker + '总点播量：' +params[0].data + line_value.unit + '人';
                },
                textStyle:{
                    color:'#fff',
                },
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        
                }
              },
            grid: {
                show: false,
                top: "30px",
                left: "50px",
                right: "0px",
                bottom: "60px"
            },
            xAxis: {
                type: 'category',
                axisLabel:{
                    rotate:60,
                    // textStyle:{
                        color:'#fff'
                    // }
                },
                axisLine:{
                    show:true,
                    lineStyle: {
                        color: '#2F80ED',
                        width: 1,
                        type: 'solid',
                    },
                },
                data: line_value.xData
            },
            yAxis: {
                type: 'value',
                name:'单位：' + line_value.unit + '人',
                nameTextStyle: {		
                    color: "#63A5FF",
                },
                axisLabel:{
                    // textStyle:{
                        color:'#63A5FF',
                        fontSize:12
                    // }
                },
                nameGap:15,
                splitLine: {	
                    show: true,					
                    lineStyle: {
                        color: 'rgba(47, 128, 237, 0.2)',
                        width: 1,
                        type: 'solid',
                    },
                },
                axisLine:{
                    show:false
                }
            },
            series: [{
                name:'市级平台总点播量',
                type: 'line',
                data: line_value.view_value,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#3A67FF'
                    }, {
                        offset: 1,
                        color: 'rgba(58, 103, 255, 0)'
                    }])
                },
            },
            {
                name:'市级平台总访问量',
                type: 'line',
                data: line_value.num_value,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(49, 251, 251, 0.48)'
                    }, {
                        offset: 1,
                        color: 'rgba(49, 251, 251, 0)'
                    }])
                },
            }]
        };
        
        myChart.setOption(option);
    }
}