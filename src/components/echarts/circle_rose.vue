<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='700'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'bar',
    components: {chart},
    props: {
        roseData:{type:Object},
        styles:{type:Object},
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        roseData:{
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
            var largeData = [];
            var sum = 0, max = 0;
            that.roseData.value.forEach(item => {
                sum += Number(item.value) ;
                if(Number(item.value) >= max) {
                    max = Number(item.value);
                }
            })
            var number = Math.round(max * 0.5);
            largeData = that.roseData.value.map(item => {
                return {
                    value: number + Number(item.value),
                    name: item.name
                }
            });
            
            let setLabel = (value) => {
                let opts = [];
                for (let i = 0; i < value.length; i++) {
                    let item = {};
                    item.name = value[i].name;
                    item.value = value[i].value;
                    item.label = {  
                        //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
                        show: true,
                        color:that.roseData.color[i],
                        align:'center',
                        lineHeight:20,
                        formatter: function(params){
                            return [params.name, (((Number(params.value) - number) / sum) * 100).toFixed(2) + '%'].join('\n')
                        },
                    }
                    opts.push(item)
                }
                return opts;
            }
            this.option = {
                title:{
                    text:'{a|' + that.roseData.title + '}' + '{b|' + that.roseData.sub_title + '}',
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
                    formatter: function(params){
                        return params.name + '：' + (Number(params.value) - number) + '（' + (((Number(params.value) - number) / sum) * 100).toFixed(2) + '%）'
                    },
                    transitionDuration:0,
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    textStyle:{
                        color:'#fff'
                    }
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 10,
                            borderColor:'#fff',
                            borderWidth:2,
                        },
                        label:{
                            show:true,
                            // rotate:0,
                            fontSize:14,
                            edgeDistance:10
                        },
                        labelLine:{
                            show:false,
                            length:2,
                            length2:10
                        },
                        data: setLabel(largeData),
                    },
                ],
            };
        }
    }
}
</script>
