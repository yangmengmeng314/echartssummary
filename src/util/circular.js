/*@desc:环形图 */
// import echarts from 'echarts'
import * as echarts from 'echarts';
export default {
    getCircular(el,color,value,title,sub_title) {
        var myChart = echarts.init(document.getElementById(el));

        
        window.addEventListener('resize', function () {
            // var dom = document.getElementById('echarts')
            // var mWidth = dom.clientWidth ? dom.clientWidth : ''
            // var mHeight = dom.clientHeight ? dom.clientHeight - 80 : ''
            // var mWidth = window.innerWidth - 250
            // var mHeight = window.innerHeight - 450
            var mWidth = document.getElementById('echarts').clientWidth
            var mHeight = document.getElementById('echarts').clientHeight - 80
            myChart.resize({width:mWidth/2,height:mHeight})
        })
        // if(!document.getElementById('echarts')){
        //     window.removeEventListener('resize',)
        // }
        //设置宽度，以防显示隐藏跳转时获取不到宽高变成100px问题
        var mWidth = document.getElementById('echarts').clientWidth
        var mHeight = document.getElementById('echarts').clientHeight - 80
        // var mWidth = window.innerWidth - 250
        //     var mHeight = window.innerHeight - 450
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
                        '{d|{b} {c}}',
                        // '{a|{c}}',
                        '{b|}' ,
                        

                        // '{a|{c}}',
                        // '{b|}' ,
                        // '{d|{b} {c}}',
                    ].join('\n'), //用\n来换行
                    rich: {
                        a: {
                            width:1,
                            left: 20,
                            // padding: [0, -70, -15, -50],
                            padding: [-30, -35, -15, -30],
                            color:color[i]
                        },
                        b: {
                            height: 5,
                            width: 5,
                            lineHeight: 5,
                            marginBottom: 10,
                            // padding: [0, 0],
                            padding: [-5, -5],
                            borderRadius: 5,
                            backgroundColor: color[i], // 圆点颜色和饼图块状颜色一致
                        },
                        d:{
                            padding:[-10,10,0,10],
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
                formatter:'{a}{b} : {c}（{d}%）',
                transitionDuration:0,
                borderWidth:'0',
                backgroundColor:'rgba(25, 25, 30, 0.7)',
                textStyle:{
                    color:'#fff'
                }
            },
            color:color,
            series: [
                // 设置数值是在指示线上扇形外并且添加圆点
                {
                    name: '',
                    type: 'pie',
                    radius: ['20%', '40%'],
                    // avoidLabelOverlap: false,
                    minAngle: 15,
                    labelLine: {
                        show: true,
                        length:10,
                        length2:40,
                    },
                    data: setLabel(value) 
                },
                // 设置扇形上有数值
                // {
                //     name: '',
                //     type: 'pie',
                //     radius: ['20%', '40%'],
                //     // avoidLabelOverlap: false,
                //     label: {
                //         show: true,
                //         formatter:'{d}%',
                //         // color:'#fff'
                //     },
                //     labelLine: {
                //         show: true
                //     },
                //     data: value
                // }
            ]
        };
        myChart.setOption(option);
    }
}