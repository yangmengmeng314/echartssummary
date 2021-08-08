/*@desc:环形图指示线有点 简单 苏E优课-学科观看率统计表 */
<template>
    <div :style="styles?styles:'width:100%;height:100%'">
        <chart style="width:100%;height:100%" v-bind:option="option" :delay_time='500'></chart>
    </div>
</template>

<script>
import chart from "@/components/echarts/echarts";
export default {
    name: 'circle_dotted',
    components: {chart},
    props: {
        circleData:{type:Object},
        styles:{type:Object},
    },
    data () {
        return {
            option:{},
        }
    },
    watch: {
        circleData:{
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
            let setLabel = (value) => {
                let opts = [];
                for (let i = 0; i < value.length; i++) {
                    let item = {};
                    item.name = value[i].name;
                    item.value = value[i].value;
                    item.label = {
                        //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
                        show: true,
                        //a和b来识别不同的文字区域
                        formatter: [
                            '{d|{b} {d}%}',
                            '{b|}' ,
                        ].join('\n'), //用\n来换行
                        rich: {
                            a: {
                                width:1,
                                left: 20,
                                padding: [-30, -35, -15, -30],
                                color:that.circleData.color[i]
                            },
                            b: {
                                height: 5,
                                width: 5,
                                lineHeight: 5,
                                marginBottom: 10,
                                padding: [-5, -5],
                                borderRadius: 5,
                                backgroundColor: that.circleData.color[i], // 圆点颜色和饼图块状颜色一致
                            },
                            d:{
                                padding:[-10,10,0,10],
                                color:that.circleData.color[i]
                            }
                        },
                    }
                    opts.push(item)
                }
                return opts;
            }
            this.option = {
                title:{
                    text:'{a|' + that.circleData.title + '}' + '{b|' + that.circleData.sub_title + '}',
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
                    formatter:'{a}{b} : {c}（{d}%）',
                    transitionDuration:0,
                    borderWidth:'0',
                    backgroundColor:'rgba(25, 25, 30, 0.7)',
                    textStyle:{
                        color:'#fff'
                    }
                },
                color:that.circleData.color,
                series: [
                    // 设置数值是在指示线上扇形外并且添加圆点
                    {
                        name: '',
                        type: 'pie',
                        radius: ['20%', '40%'],
                        avoidLabelOverlap: true,
                        minAngle: 15,
                        labelLine: {
                            show: true,
                            length:10,
                            length2:40,
                        },
                        data: setLabel(that.circleData.value) 
                    },
                ]
            };
        }
    }
}
</script>
