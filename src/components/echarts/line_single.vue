/*@desc:echarts单线形图 有legend 示例：在线答疑-总体答疑-抢单时间统计*/
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='2000'></chart>
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
            option:{}
        }
    },
    computed: {},
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
    //     this.initCharts();
    // },
    methods: {
        initCharts(){
            let that = this
            this.option = {
                title:{
                    text:that.singleLineData.title,
                    // left:'10px',
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
                        // borderType:'dotted'
                    }
                },
                color:that.singleLineData.color,
                tooltip: {
                    trigger: 'axis',
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    formatter:function(params){
                        return params[0].name + "<br>" + params[0].marker + that.singleLineData.legend[0] + '：' +params[0].data + that.singleLineData.unit;
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
                    left: "90px",
                    right: "50px",
                    bottom: "25px"
                },
                xAxis: {
                    type: 'category',
                    axisLabel:{
                        color:'#7B7B7B'
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
                            color: 'rgba(255, 158, 123, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(249, 143, 109, 0.0001)'
                        }])
                    },
                }]
            };
        }
    },
}
</script>

<style scoped>
</style>
