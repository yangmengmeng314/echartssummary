/*@desc:echarts单线形图 */
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='500'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'singleLine',
    components: {chart},
    props: {
        singleLineData:{type:Object},
        styles:{type:Object}
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        singleLineData:{
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
                    text:'{a|' + that.singleLineData.title + '}' + '{b|' + that.singleLineData.sub_title + '}',
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
                legend: {
                    show:true,
                    data: that.singleLineData.legend,
                    right:50,
                    icon: "circle",
                    itemWidth: 10,
                    textStyle:{
                        color:that.singleLineData.color,
                        fontSize:13,
                        fontWeight:600
                    }
                },
                color:that.singleLineData.color,
                tooltip: {
                    trigger: 'axis',
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    formatter:function(params){
                        return params[0].name + '：' +params[0].data + that.singleLineData.unit;
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
                    top: "70px",
                    left: "80px",
                    right: "50px",
                    bottom: "50px"
                },
                xAxis: {
                    type: 'category',
                    axisLabel:{
                        // rotate:20,
                        color:'#7B7B7B',
                        formatter:function(params){
                                var newParamsName = '';  // 最终拼接的字符串
                                var paramsNameNumber = params.length
                                var provideNumber = 4;   //每行能显示字的个数
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
                    axisLine:{
                        show:true,
                        lineStyle: {
                            color: '#EBEBEB',
                            width: 1,
                            type: 'solid',
                        },
                    },
                    data: that.singleLineData.xData
                },
                yAxis: {
                    type: 'value',
                    nameTextStyle: {		
                        color: "#EBEBEB",
                    },
                    axisLabel:{
                        color:'#7B7B7B',
                        fontSize:12
                    },
                    nameGap:15,
                    splitLine: {	
                        show: true,					
                        lineStyle: {
                            color: '#EBEBEB',
                            width: 1,
                            type: 'solid',
                        },
                    },
                    axisLine:{
                        show:false
                    }
                },
                series: [{
                    name:that.singleLineData.legend[0],
                    type: 'line',
                    data: that.singleLineData.value,
                    areaStyle: {
                        color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255, 144, 68, 0.727)'
                        }, {
                            offset: 1,
                            color: 'rgba(255, 195, 158, 0.746312)'
                        }])
                    },
                }]
            };
        }
    }
}
</script>
