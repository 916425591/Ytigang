<template>

  <div class="state-Using-from" v-model="charResize"   id="ringChart"></div>

</template>

<script>
  import store from '../../../store/index'
  export default {
    name: "environm-from",
    data(){
      return{
        ringCharts:null,
        screenWidth:'',
        chartTrue:false
      }
    },
    mounted(){
       this.ringChartInit();
    },
    computed:{
       charResize(){
         if(this.chartTrue){
           this.ringCharts.resize();
         }
         return store.state.vuexWidth
       }
    },
    methods:{
      ringChartInit(){
        this.ringCharts = this.$echarts.init(document.getElementById('ringChart'));
        // 把配置和数据放这里
        this.ringCharts.setOption({
          // backgroundColor: "#2c343c",
          xAxis: {
            data: ['2', '4', '6', '8', '10', '12', '14'],
            axisLine: {
              lineStyle: {
                // color: '#0177d4'
              }
            },
            axisLabel: {
              color: '#666',
              fontSize: 12
            }
          },
          yAxis: {
            name: "挡位",
            nameTextStyle: {
              color: '#666',
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              color: '#666',
              fontSize: 12
            },
            splitLine: {
              show:false,
              lineStyle: {
                color: '#666'
              }
            },
            interval:1,
            max:10

          },
          series: [{
            type: 'bar',
            barWidth: 18,
            itemStyle:{
              normal:{
                color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#92bbfb'
                }, {
                  offset: 0.8,
                  color: '#9c9afd'
                }], false)
              }
            },
            data: [1, 4, 6, 5, 8, 3, 2]
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
