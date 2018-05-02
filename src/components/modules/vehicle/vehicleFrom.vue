<template>
  <div class="state-Using-from" v-model="charResize" ref="myEchart"></div>
</template>

<script>
  import store from '../../../store/index'
  export default {
    name: "environm-from",
    data(){
      return{
        chart:null,
        chartTrue:false
      }
    },
    mounted(){
      this.initChart();
    },
    computed:{
      charResize(){
        if(this.chartTrue){
          this.chart.resize();
        }
        return store.state.vuexWidth
      }
    },
    methods:{
      //表格加载
      initChart(){
        this.chart = this.$echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        this.chart.setOption({
          // backgroundColor: "#2c343c",
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#8c7cde'
              }
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['11:11', '11:12', '11:13', '11:14', '11:15', '11:16', '11:17','11:18','11:17','11:18','11:19','11:20','11:21','11:22']
          },
          yAxis: {

            type: 'value',
            scale: true,
            min: 10,
            max:100,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
              // name: 'y'
            },
          },
          series: [{
            data: [30, 40, 50, 40, 45, 60, 70,82,83,92,94,95,100],
            type: 'line',
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c6b9ff'
                  },
                    {
                      offset: 1,
                      color: '#e4dffd'
                    }
                  ]
                )
              }
            },
            // itemStyle: {
            //   opacity: 0.2
            // },
            lineStyle: {
              normal: {
                // color: 'e4dffd'
                color: 'transparent'
              }
            },
            emphasis: {
              itemStyle: {
                color: '#c6b9ff',
                // borderColor: '#fff',
                // borderWidth: 11,
                // borderType: 'solid',
                // opacity: 1
              },
            }
          }]

        });
        this.chartTrue=true
      },
    }
  }
</script>

<style scoped lang="scss">
  .state-Using-from{
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
