/*@desc:echarts柱状图横向 */
<template>
  	<div :id="id" :style="style" :key="keyValue"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
	name: "bar",
	components: {},
	props: {
		id: { type: String },
		width: { type: String },
		height: { type: String },
		resource_view: { type: Object },
		keyValue: { type: String },
		loading: { type: String },
		search_form: { type: Object },
	},
	data() {
		return {
		myEcharts: null,
		max: 2000,
		unit: "万",
		};
	},
	computed: {
		style() {
		return {
			height: this.height,
			width: this.width,
		};
		},
	},
	watch: {
		resource_view: {
		handler() {
			this.initData();
		},
		deep: true,
		},
		keyValue(newVal, oldVal) {
		// this.initData()
		},
	},
	created() {},
	mounted() {
		this.initData();
		window.addEventListener("resize", this.resize, true);
	},
	methods: {
		initData() {
			if (this.search_form.school_id && this.search_form.school_id != "0") {
				this.unit = "个";
			}
			let that = this;
			const loading = this.$loading({
				lock: true,
				text: "加载中",
				spinner: "el-icon-loading",
				target: document.querySelector("#" + this.id),
			});
			setTimeout(function () {
				that.initCharts();
				loading.close();
			}, 500);
		},
		resize() {
			this.myEcharts.resize();
		},
		initCharts() {
			if(document.getElementById(this.id) == null){
				return
			}
			echarts.dispose(document.getElementById(this.id))
			this.myEcharts = echarts.init(document.getElementById(this.id));
			let that = this;
			let option = {
				tooltip: {
					trigger: "axis",
					backgroundColor: "rgba(25, 25, 30, 0.7)",
					borderWidth: "0",
					textStyle: {
						color: "#fff",
					},
					formatter: (params) => {
						// 自定义toolTip提示框显示内容
						var res = params[0].axisValue + "<br />";
						res +=
						params[0].seriesName +
						"：" +
						params[0].data +
						this.unit +
						"<br />";
						res +=
						params[1].seriesName +
						"：" +
						params[1].data +
						this.unit +
						"<br />";
						return res;
					},
				},
				grid: {
					top: "30px",
					left: "1%",
					right: "1%",
					bottom: "10px",
					containLabel: true,
				},

				legend: {
					itemGap: 50,
					right: 0,
					data: [
						{
							name: "课程浏览量",
							textStyle: {
								color: "#6D71EF",
							},
						},
						{
							name: "互动直播观看量",
							textStyle: {
								color: "#EA4C89",
							},
						},
					],
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: true,
						axisLine: {
						//坐标轴轴线相关设置。数学上的x轴
						show: true,
						lineStyle: {
							color: "#ebebeb",
						},
						with: 1,
						},
						axisLabel: {
						//坐标轴刻度标签的相关设置
						interval:0,
						color: "#7b7b7b",
						margin: 15,
						},
						axisTick: {
						show: false,
						},
						data: this.resource_view.title,
					},
				],
				yAxis: [{
					type: "value",
					name: "单位：" + this.unit,
					nameLocation: "end",
					splitLine: {
						show: true,
						lineStyle: {
							color: "#ebebeb",
							width: 1,
						},
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						margin: 20,

						color: "#7b7b7b",
					},
					axisTick: {
						show: false,
					},
				},
				],
				series: [
				{
					name: "课程浏览量",
					type: "line",
					// smooth: true, //是否平滑曲线显示
					// 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
					showAllSymbol: true,
					symbol: "circle",
					lineMinHeight: 15,
					symbolSize: 6,
					lineStyle: {
					color: "#6D71EF", // 线条颜色

					borderColor: "#6D71EF",
					},
					// label: {
					//   show: true,
					//   position: "top",
					//     color: "#fff",
					// },
					itemStyle: {
					color: "#6D71EF",
					},

					areaStyle: {
						color: new echarts.graphic.LinearGradient(0,0,0,1,[{
								offset: 0,
								color: "rgba(109, 113, 239, 0.4)",
							},{
								offset: 1,
								color: "rgba(0,0,0, 0)",
							},],
							false
						),
						shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
						shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
					},
					data: this.resource_view.view_num,
				},
				{
					name: "互动直播观看量",
					type: "bar",
					barWidth: 35,
					barMinHeight:15,
					label: {
					show: true,
					position: "inside",
					color: "#fff",
					},
					itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "#EA4C89",
						},
						{
							offset: 1,
							color: "#EA4C89",
						},
					]),
					},
					data: this.resource_view.live_view_num,
				},
				],
			};

			that.myEcharts.setOption(option);
		},
	},
	activated() {
		let that = this;
		window.addEventListener("resize", that.resize, true);
	},
	deactivated() {
		let that = this;
		window.removeEventListener("resize", that.resize, true);
	},
};
</script>

<style scoped>
</style>
