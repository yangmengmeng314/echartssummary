
import * as echarts from 'echarts';
export default {
  getColumn(el, num1, num2) {
    var myChart = echarts.init(document.getElementById(el));
    //当前视口宽度
    let nowClientWidth = document.documentElement.clientWidth;
    // 换算方法

    let nowSize = 18 * (nowClientWidth / 1920);
    let width = 38 * (nowClientWidth / 1920);
    window.addEventListener('resize', function () {
      myChart.resize();
    })
    let data1 = num2.split('%')[0]
    let data2 = num1.split('%')[0]
    var option = {        
      color: ['#63A5FF'],
      tooltip: {
        trigger: 'axis',
        borderWidth:'0',
        backgroundColor:'rgba(25, 25, 30, 0.7)',
        textStyle:{
            color:'#fff',
        },
        formatter:function(params){
          return params[0].name+"<br>"+params[0].data+"%";
          },
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'

        }
      },
     
      series: [{
        type: 'bar',
        barWidth: width,
        radius: '100%',
        data: [data1, data2],        //数据
       
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 12
              },
             
            },
            
            // 柱状图颜色
            color: params => {
              //  colorList是每根柱子的颜色，一组是一个渐变
              var colorList = [
                ['#3F94FF', '#6B3FFF'],
                ['#BB39F9', '#8C22Ff'],

              ]
              var index = params.dataIndex
              // 柱子个数超过colorList设置的个数，循环使用
              if (index >= colorList.length) {
                index = index - colorList.length
              }
              // 这里的this.$echarts是项目中的echarts示例，改成对应的名字就好
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: colorList[index][0]
              }, {
                offset: 1,
                color: colorList[index][1]
              }])
            }
          },
        },
       
      }],
      grid: {
        show: false,
        top: "30px",
        left: "50px",
        right: "0px",
        bottom: "60px"
      },
     
      xAxis: [
        {
          type: 'category',
          data: ['本周答疑率', '历史答疑率'],
          offset: 10,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: nowSize,
            },
            show: true
          },
          axisTick: {
            show: false
          },
          axisLine: {					//---坐标轴 轴线
            show: true,					//---是否显示
            lineStyle: {
              color: '#0F79D6',
              width: 1,
              type: 'solid',
            },
          },
        }
      ],
      yAxis: [
        {
          nameTextStyle: {				//---坐标轴名称样式
            color: "#63A5FF",
          },
          axisLine: {					//---坐标轴 轴线
            show: false,					//---是否显示
          },
          splitLine: {					//---grid 区域中的分隔线
            show: true,					//---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
              color: 'rgba(15, 121, 214, 0.3)',
              width: 1,
              type: 'solid',			//---类型
            },
          },
          name: '单位：%',
          type: 'category',
          type: 'value',
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#63A5FF'
            },
            show: true,
            min: 0, //y轴的最小值
            max: 100, //y轴最大值
            interval: 20, //值之间的间隔
          },
        }
      ],
    };
    myChart.setOption(option);
  }
} 