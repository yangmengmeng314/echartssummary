/*@desc:echarts有竖行柱状图 无legend 示例：在线答疑-学生提问-提问时间段分布统计表*/
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='2000'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'barVertical',
    components: {chart},
    props: {
        shadowBarData:{type:Object},
        styles:{type:Object},
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        shadowBarData:{
            handler(){
                let that = this;
                this.$nextTick(function(){
                    that.initCharts();
                })
            },
            deep:true
        }
    },
    created () {},
    // mounted () {
    //     let that = this;
    //     this.$nextTick(function(){
    //         that.initCharts();
    //     })
    // },
    methods: {
        initCharts(){
            let that = this
            this.option = {
                title:{
                    text:'{a|' + that.shadowBarData.title + '}' + '{b|' + that.shadowBarData.sub_title + '}',
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
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    top: '15%',
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
                        return params[0].name  + ' : ' + params[0].value + that.shadowBarData.unit + "<br>" + '占比：' + that.shadowBarData.percent[params[0].dataIndex]
                    }
                },
                xAxis: [{
                    type: 'category',
                    inverse: true,
                    axisLabel: {
                        interval: 0,
                        color: '#6F6F6F',
                        show: true,
                        formatter:function(params){
                            var newParamsName = '';  // 最终拼接的字符串
                            var paramsNameNumber = params.length
                            var provideNumber = 6;   //每行能显示字的个数
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
                    axisLine:{
                        show:true,
                        lineStyle: {
                            color: '#EBEBEB',
                            width: 1,
                            type: 'solid',
                        },
                    },
                    data: that.shadowBarData.xdata
                }],
                yAxis: {
                    show: true,
                    type: 'value'
                },
                series: [{
                        type: 'bar',
                        zlevel: 1,
                        itemStyle: {
                            color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: that.shadowBarData.bar_color[0]
                            }, {
                                offset: 1,
                                color: that.shadowBarData.bar_color[1]
                            }]),
                        },
                        
                        barWidth: 26,
                        // barMinHeight:20,
                        data: that.shadowBarData.value
                        // data: that.shadowBarData.value.map(item => {
                        //     return item == 0 ? null : item
                        // })
                    }
                ]
            };
        }
    }
}
</script>
