/*@desc:echarts折线柱状混合图 有legend 双y轴 示例：在线答疑-学生提问-提问解答情况统计表*/
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='500'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'bar',
    components: {chart},
    props: {
        barLineData:{type:Object},
        styles:{type:Object}
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        barLineData:{
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
                    text:'{a|' + that.barLineData.title + '}' + '{b|' + that.barLineData.sub_title + '}',
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
                color:that.barLineData.color,
                tooltip: {
                    trigger: 'axis',
                    transitionDuration:0,
                    formatter:function(params){
                        return params[0].name + "<br>" + params[0].marker + '学生提问数：' +params[0].data + that.barLineData.unit[0] + "<br>" + params[1].marker + '解答率：' +params[1].data + that.barLineData.unit[1];
                    },
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    textStyle:{
                        color:'#fff'
                    }
                },
                grid: {
                    top: "80px",
                    left: "3.5%",
                    right: "20px",
                    bottom: "10px",
                    containLabel:true
                },
                legend: {
                    data: that.barLineData.legend,
                    top:40,
                    textStyle:{
                        // color:[' #EA4C89','#6D71EF'],
                        fontSize:13,
                    },
                    itemGap: 30,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: that.barLineData.xData,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                            color: '#6F6F6F',
                            show: true,
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
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name:'单位：' + that.barLineData.unit[0],
                        min: 0,
                        nameTextStyle:{
                            // padding:[0,0,0,-4]
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name:'单位：' + that.barLineData.unit[1],
                        min: 0,
                        max: 100,
                        axisLabel: {
                            formatter: '{value}%'
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
                    }
                ],
                series: [
                    {
                        name: that.barLineData.legend?that.barLineData.legend[0]:'',
                        type: 'bar',
                        data: that.barLineData.value1,
                        barWidth:28
                    },
                    {
                        name: that.barLineData.legend?that.barLineData.legend[1]:'',
                        type: 'line',
                        yAxisIndex: 1,
                        data: that.barLineData.value2
                    }
                ]
            };
        }
    }
}
</script>

<style scoped>
</style>
