<template>
    <div :id="id" :style="style" :key="keyValue"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'echarts_circle',
    components: {},
    props: {
        id:{type:String},
        width:{type:String},
        height:{type:String},
        lesson_content:{type:Array},
        keyValue:{type:String},
    },
    data () {
        return {
            myEcharts:'',
        }
    },
    computed: {
        style(){
            return{
                height:this.height,
                width:this.width
            }
        }
    },
    watch: {
        lesson_content:{
            handler(){
                this.initData() 
            },
            deep:true
        },
        keyValue(newVal,oldVal){
            // this.initData()
        }
    },
    created () {},
    mounted () {
        this.initData()
        window.addEventListener('resize',this.resize,true)
    },
    methods: {
        initData(){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                target: document.querySelector('#'+ this.id)
            });
            setTimeout(function(){
                that.initCharts();
                loading.close()
            },700)
        },
        resize(){
            this.myEcharts.resize()
        },
        initCharts(){
            if(document.getElementById(this.id) == null){
                return
            }
            echarts.dispose(document.getElementById(this.id))
            this.myEcharts = echarts.init(document.getElementById(this.id))
            let that = this           
            var color=['#5470C6','#92CC75','#FBC959','#EF6767']
    //   var getsjjg = ["全部", "语文", "历史", "政治"];
    //   var getsjjgrs = [625, 125, 125, 125];
      var data = [];
      for (var i = 0; i < this.lesson_content.length; i++) {
        data.push({
          name: this.lesson_content[i].title,
          value: this.lesson_content[i].num,
          label:{color:color[i]}
        });
      }
      var rich = {
        percent: {
          color: "#FFF",
          align: "right",
          fontSize: 15,
          fontWeight: "500",
          //padding: [0, 5]
        },

        cir: {
          fontSize: 26,
        },
      };

      let option = {
          
          	tooltip : {
				trigger: 'item',
                 backgroundColor:'rgba(25, 25, 30, 0.7)',
               borderWidth:'0',
                    textStyle:{
                        color:'#fff'
                    },
				// formatter: "{b} : {c} ({d}%)"
                formatter: "{b} : {d}%"
			},
        series: [
          {
            type: "pie",
            radius: ["0%", "80%"],
            center: ["50%", "50%"],
            label: {            
                position: "inner",
                formatter: (params) => {
                  return "{percent|" + params.percent + "%}";
                },
                rich: rich,
            },
            data: data,
          },         
          {
            type: "pie",
            silent: true, //取消高亮
            radius: ["0%", "80%"],
            center: ["50%", "50%"],
            labelLine: {
        
                length: 20,
                length2: 30,
            },
            label: {
              position: "outer",
            },
            data: data,
            z: -1,
          },
        ],
      };
            that.myEcharts.setOption(option);
        }
    },
    activated(){
        let that = this
        window.addEventListener('resize',that.resize,true);
    },
    deactivated(){
        let that = this
        window.removeEventListener('resize',that.resize,true)
    },
}
</script>