/*@desc:实心饼状图 */
import * as echarts from 'echarts';
export default {
    getPie(el,color,value,title,sub_title) {
        var myChart = echarts.init(document.getElementById(el));

        window.addEventListener('resize', function () {
            var mWidth = document.getElementById('echarts').clientWidth - 200
            var mHeight = document.getElementById('echarts').clientHeight - 80
            myChart.resize({width:mWidth/2,height:mHeight})
        })
        //设置宽度，以防显示隐藏跳转时获取不到宽高变成100px问题
        var mWidth = document.getElementById('echarts').clientWidth - 200
        var mHeight = document.getElementById('echarts').clientHeight - 80
        myChart.resize({width:mWidth/2,height:mHeight})
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
                        '{d|{c}}'
                    ].join('\n'), //用\n来换行
                    rich: {
                        d:{
                            color:color[i],
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
        var option = {
            title:{
                text:'{a|' + title + '}' + '{b|' + sub_title + '}',
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
                formatter:'{a}{b} : {c}({d}%)',
                transitionDuration:0,
                borderWidth:'0',
                backgroundColor:'rgba(25, 25, 30, 0.7)',
                textStyle:{
                    color:'#fff'
                }
            },
            color:color,
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: setLabel(value),
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
                    emphasis: {
                        itemStyle: {
                            // shadowBlur: 10,
                            // shadowOffsetX: 0,
                            // shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                {
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    data: value,
                    labelLine:{
                        show:false
                    },
                    label:{
                        // barWidth:12,
                        formatter:'{d}%',
                        position:'inner',
                        color:'#fff',
                        fontSize:14
                    },
                    itemStyle:{
                        borderColor:'#fff',
                        borderWidth:4
                    },
                }
            ]
        };
        myChart.setOption(option);
    }
}