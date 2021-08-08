
// import echarts from 'echarts'
import * as echarts from 'echarts';
import { nodeName } from 'jquery';
import jiangsuJson from './jiangsu.json'

export default {
    getMap(el, data,type) {
        echarts.registerMap('江苏', jiangsuJson)
        let cityData = [
            { name: '南京市', selected: false, value: 60.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '常州市', selected: false, value: 10.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '淮安市', selected: false, value: 54.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '南通市', selected: false, value: 89.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '宿迁市', selected: false, value: 74.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '无锡市', selected: false, value: 89.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '扬州市', selected: false, value: 89.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '盐城市', selected: false, value: 90.60, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '苏州市', selected: false, value: 60.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '泰州市', selected: false, value: 98.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '镇江市', selected: false, value: 46.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '连云港市', selected: false, value: 21.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
            { name: '徐州市', selected: false, value: 89.71, stu_reg_num: '783303', stu_reg_per: '35425', tea_reg_num: 'sch_reg_per', tea_reg_per: '71.60%', },
        ]
        data.forEach(item1 => {
            cityData.forEach(item2 => {
                if (item1.city_title == item2.name) {
                    item2.stu_reg_num = item1.stu_reg_num
                    item2.stu_reg_per = item1.stu_reg_per
                    item2.tea_reg_num = item1.tea_reg_num
                    item2.tea_reg_per = item1.tea_reg_per
                    if(type == 0){
                        item2.value = item1.stu_reg_per.split('%')[0]
                    }else{
                        item2.value = item1.tea_reg_per.split('%')[0]
                    }
                }
            })

        });

        let myChart = echarts.init(document.getElementById(el));
        window.onresize = function () {
            myChart.resize();
        }
        let option = {
            layoutSize: '100%',
            
            series: [{
                name: '可调资源分布',
                type: 'map',
                //   roam: true,
                map: '江苏',
                label: {
                    normal:{
                        show:true,
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    emphasis: { //对应的鼠标悬浮效果
                        show: false,
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                aspectScale: 0.75,
                zoom: 1.2,
                itemStyle: {
                    normal: {
                        borderWidth: .5, //区域边框宽度
                        borderColor: '#009fe8', //区域边框颜色
                        areaColor: "#ffefd5", //区域颜色
                    },
                    emphasis: {
                        borderWidth: .5,
                        borderColor: '#4b0082',
                        areaColor: "#ffdead",
                    }
                },
                data: cityData

            }],
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                alwaysShowContent: false,
                transitionDuration: 0.2,
                borderWidth:'0',
                backgroundColor:'rgba(25, 25, 30, 0.7)',
                textStyle:{
                    color:'#fff'
                },
                formatter: function (params) {
                    let renderMode = ''
                    let value = (params.value + '').split('.');
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                    return renderMode += `
             <div style='width:170px;height:126px;padding:0 13px 0 13px;'>
                <p style='border-bottom:1px solid #6182A3;line-height:30px'>${params.name}</p>
                <ul style='margin-top:5px'>
                    <li style='display:flex; justify-content: space-between;'>
                        <p>学生注册数：</p>
                        <p>${params.data.stu_reg_num}</p>
                    </li>
                    <li style='display:flex; justify-content: space-between;'>
                        <p>教师注册数：</p>
                        <p>${params.data.tea_reg_num}</p>
                    </li>
                    <li style='display:flex; justify-content: space-between;'>
                        <p>学生注册率：</p>
                        <p>${params.data.stu_reg_per}</p>
                    </li>
                    <li style='display:flex; justify-content: space-between;'>
                        <p>教师注册率：</p>
                        <p>${params.data.tea_reg_per}</p>
                    </li>
                </ul>
             </div>
              ` ;
                },
            },
            dataRange: {
                x: '-1000 px', //图例横轴位置
                y: '-1000 px', //图例纵轴位置
                show: true,
                splitList: [
                    { min: 60, max: 79.99, color: 'rgba(220,167,94,1)' },
                    { min: 80, max: 89.99, color: '#5AD7FF' },
                    { min: 90, max: 100, color: '#3CF58A' },
                    { min: 0, max: 60, color: '#F13F3F' },

                ],
                // selectedMode: 'single',
                selectedMode: 'multiple',

            }, //各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；
            grid: {
                show: false,
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
            },
        };
        myChart.clear();
        myChart.setOption(option);
        // window.onresize = function () {
        //     myChart.resize();
        // }
    }
}
