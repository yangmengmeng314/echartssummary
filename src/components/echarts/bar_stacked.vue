/*@desc:echarts堆叠柱状图 有legend 示例：在线答疑-总体答疑-各地区积分统计*/
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='2000'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'stackedBar',
    components: {chart},
    props: {
        stackedBarData:{type:Object},
        styles:{type:Object},
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        stackedBarData:{
            handler(){
               let that = this;
                this.$nextTick(function(){
                    that.initCharts();
                })
            },
            deep:true
        },
    },
    created () {
    },
    // mounted () {
    //     this.initCharts();
    // },
    methods: {
        initCharts(){
            let that = this
            this.option = {
                title:{
                    text:'{a|' + that.stackedBarData.title + '}' + '{b|' + '（' + that.stackedBarData.sub_title + '）' + '}',
                    left:'20px',
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
                    axisPointer: {            // Use axis to trigger tooltip
                        type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    transitionDuration:0,
                    borderWidth:'0',
                    textStyle:{
                        color:'#fff'
                    },
                    formatter:function(params){
                        return params[0].name + "<br>" + params[1].marker + that.stackedBarData.legend[1] + '：' +params[1].data + that.stackedBarData.unit + "<br>" + params[0].marker + that.stackedBarData.legend[0] + '：' + params[0].data + that.stackedBarData.unit;
                    },
                },
                color:that.stackedBarData.color,
                legend: {
                    show:true,
                    data: that.stackedBarData.legend,
                    right:50,
                    icon: "circle",
                    itemWidth: 10,
                    itemGap: 30,
                    textStyle:{
                        color:that.stackedBarData.color,
                        fontSize:13,
                        fontWeight:600
                    }
                },
                grid: {
                    top:'80px',
                    left: '4%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    name: '单位：' + that.stackedBarData.unit,  
                    nameTextStyle:{
                        padding:[0,0,0,-50]
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: that.stackedBarData.xData
                },{
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        color: '#6D71EF',
                        fontSize: '14',
                        padding:[25,0,0,0]
                    },
                    position:'bottom',
                    data:that.stackedBarData.score
                }],
                series: [
                    {
                        name: that.stackedBarData.legend[0],
                        type: 'bar',
                        stack: 'total',
                        barWidth: 40,
                        label: {
                            show: true,
                            color:'#fff'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        barMinHeight:20,
                        data: that.stackedBarData.value1.map(item => {
                            return item == 0 ? null : item
                        })
                    },
                    {
                        name: that.stackedBarData.legend[1],
                        type: 'bar',
                        stack: 'total',
                        barWidth: 40,
                        barMinHeight:20,
                        label: {
                            show: true,
                            color:'#fff'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: that.stackedBarData.value2.map(item => {
                            return item == 0 ? null : item
                        })
                    },
                    
                ]
            };
        }
    },
}
</script>

<style scoped>
</style>
