<template>
  <div class="par-state main-padding">
    <div class="state-one">
      <div class="state-top">
        <!--表格-->
        <environm-from></environm-from>
      </div>
      <div class="state-bottom">
        <environm-ring></environm-ring>
      </div>
    </div>
    <div class="state-tor">
      <div class="state-top" >
        <div class="state-round-s">
          <button class="button-left"   @click="nextFloor()">
            <i class="el-icon-arrow-left"></i>
          </button>
           <div class="state-round">{{floorName}}<div class="state-box"></div></div>
          <button class="button-right"   @click="nextFloor()">
            <i class="el-icon-arrow-right"></i>
          </button>
        </div>
          <div class="state-bottom" >
          <ul>
            <li v-for="item in stateData" :style="{border:'1px solid #'+item.back+''}">
              <span :style="{background:'#'+item.back+''}"></span><i :style="{borderRight:'1px solid #'+item.back+''}"></i>{{item.name}}:{{item.numberSize}}
            </li>
          </ul>
        </div>

      </div>
      <div class="state-bottom">

        <el-col :span="24">
          <el-table
            :data="tableData"
            style="width: 100%;background: #000">
            <el-table-column
              label="设备编号"
              prop="id"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="theConOf"
              empty-text="暂无数据"
              label="温度"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="theTpe"
              empty-text="暂无数据"
              label="照度"
              align="center"
              width="">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="5"
              layout="total, prev, pager, next,jumper"
              :total="20">
            </el-pagination>
          </div>
        </el-col>
      </div>
    </div>

  </div>
</template>

<script>
  import environmFrom from '@/components/modules/lighting/lightingFrom'  /*header*/
  import environmRing from '@/components/modules/lighting/lightingColumn'
  export default {
    name: "environment",
    components:{environmRing, environmFrom},
    data(){
      return{
        stateData:[],
        //表格
        tableData: [{
          id:'001',
          theConOf: '50',
          theTpe:'30'
        },{
          id:'002',
          theConOf: '50',
          theTpe:'30'
        },{
          id:'003',
          theConOf: '50',
          theTpe:'30'
        },{
          id:'004',
          theConOf: '50',
          theTpe:'30'
        },{
          id:'005',
          theConOf: '50',
          theTpe:'30'
        },{
          id:'006',
          theConOf: '50',
          theTpe:'30'
        }],
        filts:[

        ],
        currentPage: 1,
        theListOf:true
      }
    },
    created(){
      this.initParkinfo();
    },
    mounted(){
    },
    methods:{
      nextFloor(){
        console.log('左右')
      },
      //初始化查询出来的占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
      initParkinfo(){
        this.floorName="B1"; //改变楼层
        this.stateData=[
          {
            name:'照明功耗',
            numberSize:'84',
            back:'9ade31'
          },
          {
            name:'照明温度',
            numberSize:'120',
            back:'fbdc44'
          },
          {
            name:'照明挡位',
            numberSize:'190',
            back:'f8aa2e'
          }
        ]
      },
       //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss">
  .par-state{
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: stretch;
    height: calc(100% - 120px);
    width: calc(100% - 226px);
    .state-one{
      order: 5;
      flex: 5 0 auto;
      width: 50%;
      margin-right: 10px;
      display: flex;
      height: 100%;
      position: relative;
      flex-direction: column;
      .state-top{
        flex: 5 0 auto;
        display: flex;
        position: relative;
        flex-direction: column;//上下
        margin-bottom: 10px;
        background: #fff;
        border-radius: 3px;
      }
      .state-bottom{
        position: relative;
        flex: 5 0 auto;
        display: flex;
        background: #fff;
        border-radius: 3px;
        flex-direction: column;//上下
      }
    }
    .state-tor{
      order: 5;
      border-radius: 3px;
      flex: 5 0 auto;
      width: 50%;
      text-align: center;
      position: relative;
      .state-top{
        flex: 5 0 auto;
        align-items: center;
        display: flex;
        position: relative;
        overflow-y: auto;
        flex-direction: row;
        margin-bottom: 10px;
        flex-direction: column;
        position: relative;
        background: #fff;
        height:calc( 50% - 5px);
        .state-round-s{
          flex: 5 0 auto;
          align-items: center;
          align-self: center;
          display: flex;
          flex-direction: row;
          position: relative;
        }
        .state-round{
          text-align: center;
          line-height: 106px;
          color: #fff;
          font-size: 36px;
          background: linear-gradient(180deg, #fdada2 0px, #ff999d 100%) center center / cover;
          border-radius: 50%;
          width: 106px;
          height: 106px;
          margin: 20px 30px 40px 30px;
        }
        .state-box{
          height: 9px;
          border-radius: 10px;
          width: 77px;
          margin: 0 auto;
          -webkit-box-shadow: 0px 10px 10px #ffc4c8;
          box-shadow: 0px 17px 19px #ffc4c8;
          position: relative;
          top: -15px;
        }
      }
      .state-bottom{
        flex: 5 0 auto;
        background: #fff;
        position: relative;
        height:calc( 50% - 5px);
        display: flex;
        overflow-y: auto;
        .block{
          margin: 10px 0px;
        }
        ul{
          transition:whith  0.4s;
          width: 100%;
          li{
            margin: 13px 15%;
            border-radius: 3px;
            position: relative;
            border-left: 0px !important;
            width: 70%;
            float: left;
            padding: 5px 0px;
            span{
              border-radius: 50%;
              display: inline-block;
              height: 18px;
              width: 18px;
              border-radius: 50%;
              display: inline-block;
              position: absolute;
              top: -1px;
              left: -7px;
              z-index: 2;
            }
            i{
              display: inline-block;
              width: 13px;
              height: 22px;
              position: absolute;
              z-index: 1;
              left: -2px;
              top: 10px;
              background: #fff;
            }
          }
        }
        .back-title{
          width: 100%;
          float: left;
          height: 32px;
          line-height: 32px;
          i{
            display: inline-block;
            height: 18px;
            float: left;
            background: #7362e4;
            width: 3px;
            margin-right: 6px;
            position: relative;
            top: 6px;
          }
          span{
            float: left;
          }
          button{
            float: right;
          }
        }
      }
      .button-right{
        position: absolute;
        top: 40%;
        right: -60px;
        font-size: 28px;
        border: none;
        transform: translate(32%, -12%);
        background: transparent;
        &:hover{
          color: #0000ff;
        }
      }
      .button-left{
        left: -90px;
        position: absolute;
        top: 45%;
        font-size: 28px;
        border: none;
        transform: translate(51%, -51%);
        background: transparent;
        &:hover{
          color: #0000ff;
        }
      }
    }
  }
  .next-layer {
    position: absolute;
    top: 50%;
    right: 0px;
    height: 58px;
    width: 58px;
    border-radius: 50%;
    transform: translate(-58%, -36%);
    color: #745fea;
    background: #ded8fe;
    border: 1px solid #745fea;
    transition: ease-in-out 0.4s;
    &:hover {
      background: #745fea;
      color: #fff;
      box-shadow: 0px 0px 5px #745fea;
    }
  }
</style>
