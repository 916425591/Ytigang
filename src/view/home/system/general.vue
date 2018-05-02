<template>
  <div class="par-state main-padding">
    <div class="general">
      <div class="state-from" >
            <div class="general-nav">
            过夜时间设置
            </div>
            <div class="general-input">
              <el-date-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="hoursdate1" style="width: 100%;"></el-date-picker>
            </div>
            <div class="general-input">
              <el-time-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="hoursdate" style="width: 100%;"></el-time-picker>
            </div>
            <div class="general-i">-</div>
            <div class="general-input">
              <el-date-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="hoursdate1" style="width: 100%;"></el-date-picker>

            </div>
            <div class="general-input">
              <el-time-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="hoursdate1" style="width: 100%;"></el-time-picker>
            </div>
      </div>
      <div class="state-from" >
        <div class="general-nav">
          超时停车时间设置
        </div>
        <div class="general-input">
          <el-input
            placeholder="请设置时间"
            v-model="inputData"
            size="small"
            clearable   class="input-round">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "parking-state",
    data(){
      return{
        inputData:'300',
        carType:'0',
        carTypes:[
          {
            label:'当天',
            value:'0'
          },
          {
            label:'第一天',
            value:'1'
          },
          {
            label:'第二天',
            value:'2'
          },
        ],
        period:'0',
        periods:[
          {
            label:'上午',
            value:'0'
          },
          {
            label:'下午',
            value:'1'
          },
          {
            label:'晚上',
            value:'2'
          }
        ],
        hoursdate: '',
        hoursdate1: '',
        carArea:'0',
        carAreas:[
          {
            label:'1层',
            value:'0'
          },
          {
            label:'B1层',
            value:'1'
          },
          {
            label:'B2层',
            value:'2'
          }
        ],
        area:'0',
        areas:[
          {
            label:'A区',
            value:'0'
          },
          {
            label:'B区',
            value:'1'
          },
          {
            label:'C区',
            value:'2'
          }
        ],
      }
    },
    created(){

    },
    mounted(){


    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  .par-state{
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    height: calc(100% - 120px);
    width: calc(100% - 226px);
    .general{
      padding-top: 40px;
      flex: 10 0 auto;
      border-radius: 3px;
      background: #fff;
      display: flex;
      width: 100%;
      flex-direction: column;
    }
    .general-input{
      width: 136px;
      line-height: 48px;
      margin: 0px 10px;
    }
    .general-i{
      height: 50px;
      line-height: 50px;
    }
    .general-nav{
      width: 135px;
      height: 50px;
      line-height: 50px;
      text-align: left;
      margin-left: 30px;
    }
    .state-from{
      display: flex;
      flex-direction:row ;
      margin-bottom: 20px;
    }

  }

</style>
