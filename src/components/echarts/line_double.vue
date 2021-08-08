/*@desc:echarts双线形图 有legend 一条y轴 示例：在线答疑-总体答疑-问题解答率统计 */
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='2000'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'doubleLine',
    components: {chart},
    props: {
        doubleLineData:{type:Object},
        styles:{type:Object},
    },
    data () {
        return {
            option:{}
        }
    },
    computed: {
        style(){
            return{
                height:this.height,
                width:this.width
            }
        }
    },
    watch: {
        doubleLineData:{
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
                    text:that.doubleLineData.title,
                    left:'30px',
                },
                legend: {
                    show:true,
                    data: that.doubleLineData.legend,
                    right:20,
                    icon: "circle",
                    itemWidth: 10,
                    itemGap: 30,
                    textStyle:{
                        color:that.doubleLineData.color,
                        fontSize:13,
                        fontWeight:600
                    }
                },
                color:that.doubleLineData.color,
                tooltip: {
                    trigger: 'axis',
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    formatter:function(params){
                            return params[0].name + "<br>" + '解答率：' + that.doubleLineData.resolve_percent[params[0].dataIndex] + "<br>" + params[0].marker + that.doubleLineData.legend[0] + '：' +params[0].data + "<br>" + params[1].marker + that.doubleLineData.legend[1] + '：' +params[1].data;
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
                    left: "70px",
                    right: "0px",
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
                    data: that.doubleLineData.xData
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
                    name:that.doubleLineData.legend[0],
                    type: 'line',
                    data: that.doubleLineData.question_num,
                    areaStyle: {
                        color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: that.doubleLineData.barColor[0]
                        }, {
                            offset: 1,
                            color: that.doubleLineData.barColor[1]
                        }])
                    },
                },
                {
                    name:that.doubleLineData.legend[1],
                    type: 'line',
                    data: that.doubleLineData.answer_num,
                    areaStyle: {
                        color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: that.doubleLineData.barColor[2]
                        }, {
                            offset: 1,
                            color: that.doubleLineData.barColor[3]
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
