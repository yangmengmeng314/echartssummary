/*@desc:南丁格尔玫瑰图封装 */
import * as echarts from 'echarts';
export default {
    getRose(el,color,value,title,sub_title) {
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
                    //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
                    show: true,
                    //a和b来识别不同的文字区域
                    formatter: [
                        '{d|{b}}',
                    ].join('\n'), //用\n来换行
                    rich: {
                        d:{
                            color:color[i]
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
                formatter: '{b} : {c} ({d}%)',
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
                        color: color,
                        rotate:0,
                        fontSize:14,
                        edgeDistance:'25%'
                    },
                    labelLine:{
                        show:false,
                        length:2,
                        length2:5
                    },
                    data: setLabel(value),
                },
                // {
                //     name: '面积模式',
                //     type: 'pie',
                //     radius: [20, 140],
                //     center: ['50%', '50%'],
                //     roseType: 'area',
                //     itemStyle: {
                //         borderRadius: 10, 
                //         borderColor:'#fff',
                //         borderWidth:2,
                //     },
                //     label:{
                //         show:true,
                //         rotate:0,
                //         fontSize:12,
                //         edgeDistance:'25%',
                //         formatter:'{d}%',
                //         position:'inner',
                //         color:'#fff'
                //     },
                //     labelLine:{
                //         show:false,
                //         length:2,
                //         length2:5
                //     },
                //     color:color,
                //     data: value,
                // }
            ],
        };
        myChart.setOption(option);
    }
}
