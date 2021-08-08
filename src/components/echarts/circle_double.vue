/*@desc:echart双饼状图 示例：在线答疑-学生提问-提问年级分布统计表 */
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='2700'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'echarts_pie',
    components: {chart},
    props: {
        doublePieData:{type:Object},
        styles:{type:Object}
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        doublePieData:{
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
    //     this.initCharts()
    // },
    methods: {
        initCharts(){
            let that = this
            this.option = {
                title:{
                    text:'{a|' + that.doublePieData.title + '}' + '{b|' + that.doublePieData.sub_title + '}',
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
                color:that.doublePieData.color,
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    transitionDuration:0,
                    borderWidth:'0',
                    textStyle:{
                        color:'#fff'
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
                        center: ['50%', '55%'],
                        minAngle: 35,
                        label: {
                            position: 'inner',
                            fontSize: 12,
                            color:'#fff'
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle:{
                            color:function(params){
                                return that.doublePieData.inner_color[params.dataIndex]
                            }
                        },
                        data: that.doublePieData.inner_value
                    },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['45%', '70%'],
                        center: ['50%', '55%'],
                        minAngle: 10,
                        labelLine: {
                            show: false,
                        },
                        label:{
                            show:'true',
                            position:'inner',
                            formatter: '{d}%',
                            color:'#fff'
                        },
                        itemStyle:{
                            color:function(params){
                                return that.doublePieData.out_color[params.dataIndex]
                            }
                        },
                        data: that.doublePieData.out_value
                    }
                ]
            };
        }
    },
}
</script>
