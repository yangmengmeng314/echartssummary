/*@desc:echarts所有图表的初始化监听等都在这里进行处理 */

<template>
    <div style="width:100%;height:100%" ref="chart"></div>
</template>

<script>
export default {
    name: "chart",
    props: ["option",'delay_time'],
    data() {
        return {
            myChart: null
        };
    },
    mounted() {
        window.addEventListener('resize',this.resize,true)
        // let that = this
        // const loading = that.$loading({
        //     lock: true,
        //     text: '加载中',
        //     spinner: 'el-icon-loading',
        //     target: that.$refs.chart
        // });
        // // setTimeout(() => {
        // // that.myChart = that.$echarts.init(that.$refs.chart);
        // // that.drawChart();
        // // loading.close()
        // // },this.delay_time)
        // this.$nextTick(function(){
        //     that.myChart = that.$echarts.init(that.$refs.chart);
        //     that.drawChart();
        //     loading.close()
        // })
        
    },
    watch: {
        option: function(val) {
            let that = this;
            // this.$nextTick(function(){
                if(that.myChart){
                    that.myChart.clear();
                    // that.myChart = that.$echarts.init(that.$refs.chart);
                    that.myChart.setOption(val);
                }else{
                    that.myChart = that.$echarts.init(that.$refs.chart);
                    that.drawChart();
                }
            // })
        }
    },
    methods: {
        drawChart() {
            this.myChart.setOption(this.option);
            // this.myChart.on("click", function(params) {
            //     this.$emit("clickBar",params.dataIndex);
            // });
        },
        resize(){
            this.myChart.resize();
        },
    },
    activated(){
        window.addEventListener('resize',this.resize,true)
    },
    deactivated(){
        window.removeEventListener('resize',this.resize,true)
    },
    destoryed(){
        // window.removeEventListener('resize',this.resize,true)
    }
};
</script>
<style scoped>
#chart {
  width: 100%;
  height: 100%;
}
</style>
