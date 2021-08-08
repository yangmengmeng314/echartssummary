/*@desc:echarts柱状图横向 */
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='500'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'circle_pie',
    components: {chart},
    props: {
        pieData:{type:Object},
        styles:{type:Object}
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        pieData:{
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
            let setLabel = (value) => {
                let opts = [];
                for (let i = 0; i < value.length; i++) {
                    let item = {};
                    item.name = value[i].name;
                    item.value = value[i].value;
                    item.label = {
                        show: true,
                        formatter: [
                            '{d|{b}}',
                            '{d|{d}%}'
                        ].join('\n'), //用\n来换行
                        rich: {
                            d:{
                                color:that.pieData.color[i],
                                align:'center',
                                padding:[2,0],
                                fontSize:14
                            }
                        },
                    }
                    opts.push(item)
                }
                return opts;
            }
            this.option = {
                title:{
                    text:'{a|' + that.pieData.title + '}' + '{b|' + that.pieData.sub_title + '}',
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
                    trigger: 'item',
                    formatter:'{b} : {d}%（{c}）',
                    transitionDuration:0,
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    textStyle:{
                        color:'#fff'
                    }
                },
                color:that.pieData.color,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        avoidLabelOverlap: true,
                        minAngle:10,
                        radius: '50%',
                        data: setLabel(that.pieData.value),
                        labelLine:{
                            show:false
                        },
                        label:{
                            borderColor:'#fff',
                            // fontSize:18,
                        },
                        itemStyle:{
                            borderColor:'#fff',
                            borderWidth:4
                        },
                    },
                ]
            };
        }
    },
}
</script>
