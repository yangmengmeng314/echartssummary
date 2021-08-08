/*@desc:echarts柱状图横向 */
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='delay_time'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'barHorizontal',
    components: {chart},
    props: {
        barData:{type:Object},
        styles:{type:Object},
        delay_time:{type:Number}
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        barData:{
            handler(){
                let that = this;
                this.$nextTick(function(){
                    that.initCharts();
                })
            },
            deep:true
        },
    },
    created () {},
    // mounted () {
    //     this.initCharts()
    // },
    methods: {
        initCharts(){
            let that = this
            this.option = {
                title:{
                    text:'{a|' + that.barData.title + '}' + '{b|' + that.barData.sub_title + '}',
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
                    formatter:'{b}：{c}' + that.barData.unit,
                    transitionDuration:0,
                    borderWidth:'0',
                    textStyle:{
                        color:'#fff'
                    },
                    formatter: function(params) {
                        if(that.barData.add){
                            return params[0].name + "<br>" + that.barData.legend[0] + ' : ' + params[0].value + that.barData.unit + "<br>" + that.barData.add_name + that.barData.add[params[0].dataIndex]
                        }else{
                            return params[0].name  + ' : ' + params[0].value + that.barData.unit
                        }
                    }
                },
                grid: {
                    top: "50px",
                    left: "60px",
                    right: "60px",
                    bottom: "0",
                    containLabel:true
                },
                xAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            interval: 0,
                            show: true,
                            formatter:'{value}' + that.barData.unit
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
                        data: that.barData.ydata,
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
                    data: that.barData.value,
                    label: {
                        show: true, //开启显示
                        position: 'right', 
                        color: that.barData.color,
                        fontSize: 12,
                        formatter:'{c}' + that.barData.unit,
                    },
                    itemStyle: {
                        //柱状图颜色
                        color: params => {
                            return new that.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: that.barData.bar_color[0]
                            }, {
                                offset: 1,
                                color: that.barData.bar_color[1]
                            }])
                        }
                    },

                }],
            }; 
        }
    }
}
</script>
