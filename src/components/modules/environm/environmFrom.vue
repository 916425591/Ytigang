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
            name:'小时',
            boundaryGap: false,
            data: ['2', '4', '6', '8', '10', '12', '14','16', '18', '20', '22','24']
          },
          yAxis: {
            name:'平均功率/kw/h',
            type: 'value',
          },
          series: [{
            data: [10, 30, 40, 40, 50, 60, 20,80,90,100,90,70,90,30],
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
