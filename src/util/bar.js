/*@desc:柱状图——y轴 */
// import echarts from 'echarts'
import * as echarts from 'echarts';

export default {
    getBar(el, barData) {
        var myChart = echarts.init(document.getElementById(el));

        // var dom = document.getElementById('echarts')
        window.addEventListener('resize', function () {
            var mWidth = document.getElementById('echarts').clientWidth - 200
            var mHeight = document.getElementById('echarts').clientHeight - 80
            myChart.resize({width:mWidth/2,height:mHeight})
        })
        //设置宽度，以防显示隐藏跳转时获取不到宽高变成100px问题
        var mWidth = document.getElementById('echarts').clientWidth - 200
        var mHeight = document.getElementById('echarts').clientHeight - 80
        myChart.resize({width:mWidth/2,height:mHeight})

        let data = []
        barData.value.forEach(item => {
            if(typeof item == 'string'){
                data.push(item.split("%")[0])
            }else{
                data.push(item)
            }
        })
        
        var option = {
            title:{
                text:'{a|' + barData.title + '}' + '{b|' + barData.sub_title + '}',
                left:'center',
                textStyle:{
                    rich:{
                        a:{
                            fontSize:18,
                            fontWeight:'bolder'
                        },
                        b:{
                            color:'#929292',
                            fontSize:14,
                            fontWeight:'bolder'
                        }
                    }
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor:'rgba(25, 25, 30, 0.7)',
                formatter:'{b}：{c}' + barData.unit,
                transitionDuration:0,
                borderWidth:'0',
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {
                top: "50px",
                left: "60px",
                right: "40px",
                bottom: "0",
                containLabel:true
            },

            xAxis: [
                {
                    type: 'value',
                    // scale : true,
                    axisLabel: {
                        interval: 0,
                        // textStyle: {
                        //     color: '#929292',
                        //     fontSize: '12px',
                        // },
                        // rotate:"45",
                        show: true,
                        formatter:'{value}' + barData.unit
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {					//---坐标轴 轴线
                        show: true,				
                        lineStyle: {
                            color: '#8C8C8C',
                            type: 'solid',
                        },
                    },
                }
            ],
            yAxis: [
                {
                    nameTextStyle: {				//---坐标轴名称样式
                        color: "#63A5FF",
                    },
                    axisLine: {					//---坐标轴 轴线
                        show: true,				
                        lineStyle: {
                            color: '#8C8C8C',
                            type: 'solid',
                        },			
                    },
                    // name: '单位:%',  
                    type: 'category',
                    data: barData.ydata,
                    axisLabel: {
                        interval: 0,
			            // rotate: 1,
                        // textStyle: {
                        //     color: '#5C5C5C'
                        // },
                        color: '#5C5C5C',
                        show: true,
                        formatter:function(params){
                            // var res = value
                            // if(res.length > 5){
                            //     res = res.substring(0,10) + '...'
                            // }
                            // return res
                            var newParamsName = '';  // 最终拼接的字符串
                            var paramsNameNumber = params.length
                            var provideNumber = 8;   //每行能显示字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber)  //换行的话需要显示几行
                            if(paramsNameNumber > provideNumber){
                                for(var i = 0; i < rowNumber; i++){
                                    var tempStr = "";
                                    var start = i * provideNumber;  //开始截取的位置
                                    var end = start + provideNumber
                                    //此处特殊处理最后一行的索引值
                                    if(i == rowNumber - 1){
                                        // 最后一次不换行
                                        tempStr = params.substring(start,paramsNameNumber);
                                    }else{
                                        tempStr = params.substring(start,end) + '\n';
                                    }
                                    newParamsName += tempStr
                                }
                            }else{
                                newParamsName = params
                            }
                            return newParamsName
                        }
                    },
                    axisTick: {
                        show: false
                    },
                }
            ],
            series: [{
                type: 'bar',
                barWidth: 28,
                barCategoryGap:13,
                radius: '100%',
                data: data,        //数据
                label: {
                    show: true, //开启显示
                    position: 'right', 
                    color: barData.color,
                    fontSize: 12,
                    formatter:'{c}' + barData.unit,
                },
                itemStyle: {
                    //柱状图颜色
                    color: params => {
                        return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: barData.bar_color[0]
                        }, {
                            offset: 1,
                            color: barData.bar_color[1]
                        }])
                    }
                },

            }],
        };
        myChart.setOption(option);
    },
}