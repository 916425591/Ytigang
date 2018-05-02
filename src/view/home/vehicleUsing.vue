<template>
  <div class="par-state main-padding">
    <div class="state-one">
      <div class="state-top">
        <div class="state-query">
          <div class="state-from" style="display: flex">
            <el-form ref="userQuery" :model="userQuery" label-width="80px"  >

              <el-form-item label="查询时间" class="data-item" >
                <el-col :span="11">
                  <el-date-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="userQuery.date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                <el-col :span="11">
                  <el-date-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="userQuery.date1" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="车区" class="data-item">
                <el-col :span="11">
                  <el-select size="small"  v-model="userQuery.carArea" class="input-round">
                    <el-option v-for="itme in userQuery.carAreas" :label="itme.label" :value="itme.value"></el-option>
                  </el-select>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                <el-col :span="11">
                  <el-select size="small" v-model="userQuery.area" class="input-round" placeholder="请选择活动区域">
                    <el-option v-for="itme in userQuery.areas" :label="itme.label" :value="itme.value"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item >
                <el-button type="primary"  size="small" icon="el-icon-search"  round  @click="vehiceQueryClick('userQuery')"></el-button>
              </el-form-item>
            </el-form>
          </div>
          <!---->
        </div>
        <!--表格-->
        <div class="state-Using">
        <vehicle-from></vehicle-from>
        </div>
      </div>
      <div class="state-bottom">

        <el-col :span="24">
          <p class="back-title">
            <span><i></i>报表</span>
            <el-button round icon="el-icon-download" size="small" type="danger">批量导出</el-button>
          </p>
          <el-table
            :data="tableData"
            style="width: 100%;background: #000">
            <el-table-column
              label="楼层"
              prop="id"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="area"
              empty-text="暂无数据"
              label="区域"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="lntoTraffic"
              empty-text="暂无数据"
              label="入位车流"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="outTraffic"
              empty-text="暂无数据"
              label="出位车流"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="using"
              empty-text="暂无数据"
              label="车位利用率"
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
    <div class="state-tor">
      <div class="state-top" :style="{width:theListOf?'20%':'96%'}">
        <div class="state-round">{{floorName}}<div class="state-box"></div></div>
        <div class="state-bottom" v-if="!theListOf">
          <ul>
            <li v-for="item in stateData" :style="{border:'1px solid #'+item.back+''}">
              <span :style="{background:'#'+item.back+''}"></span><i :style="{borderRight:'1px solid #'+item.back+''}"></i>{{item.min}}-{{item.max}}
            </li>
          </ul>
        </div>
        <button class="map-button"  @click="nextFloor()">
          <i :class="{'el-icon-arrow-left':!theListOf,'el-icon-arrow-right':theListOf}"></i>
        </button>
      </div>
      <div class="map-bottm">
        放地图的位置
        <button  class="next-layer"  @click="openDialog" >下一层</button>
      </div>
    </div>
    <!--地图弹窗-->
    <el-dialog
      title="查看图片"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="mapVehicle"
      @close='mapDialog'
      top="35vh"
      width="30%"
    >
      <div class="map-img">
        <img src="~@/assets/images/logo.jpg">
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import vehicleFrom from '@/components/modules/vehicle/vehicleFrom'  /*header*/
  export default {
    name: "vehicle-using",
    components:{vehicleFrom},
    data(){
      return{
        stateMsg:true,
        dialogVisible:false,
        mapVehicle:false,
        diaglogMsg:'警告',
        tableShow:true,
        userQuery:{
          date1: '',
          date2: '',
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
        },
        //当前楼层名称
        floorName:"",
        //占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
        stateData:[],
        //表格
        chart:null,
        tableData: [{
          id:'B1',
          area: 'A',
          lntoTraffic:'120',
          outTraffic:'10',
          using:'56%'
        },{
          id:'B1',
          area: 'A',
          lntoTraffic:'120',
          outTraffic:'10',
          using:'56%'
        },{
          id:'B1',
          area: 'A',
          lntoTraffic:'120',
          outTraffic:'10',
          using:'56%'
        },{
          id:'B1',
          area: 'A',
          lntoTraffic:'120',
          outTraffic:'10',
          using:'56%'
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
      //地图弹窗
      mapDialog(){
        this.mapVehicle=false
      },
      //下一层
      openDialog(){
        console.log('我是下一层')
      },
      //初始化查询出来的占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
      initParkinfo(){
        this.floorName="B1"; //改变楼层
        this.stateData=[
          {
            min:'0%',
            max:'20%',
            numberSize:84,
            back:'9ade31'
          },
          {
            min:'21%',
            max:'40%',
            numberSize:84,
            back:'fbdc44'
          },
          {
            min:'41%',
            max:'60%',
            numberSize:84,
            back:'f8aa2e'
          },
          {
            min:'61%',
            max:'80%',
            back:'ff8350'
          },
          {
            min:'81%',
            max:'100%',
            back:'fd435a'
          },
        ]
      },
      nextFloor(){
        this.theListOf =!this.theListOf;
        console.log(this.theListOf)
      },
      //查询
      vehiceQueryClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('查询',this.userQuery)
          } else {
            return false;
          }
        })
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
      flex-direction: column;
      .state-top{
        flex: 6 0 auto;
        display: flex;
        flex-direction: column;//上下
        margin-bottom: 10px;
        .state-query{
          display: flex;
          .state-from{
            display: flex;
            height: 60px;
            padding: 10px 5px 10px 0px ;
            float: left;
            background: #fff;
            margin-bottom: 8px;
            border-radius: 3px;
          }
          .data-item{
            float: left;
            width: 44%;
          }
        }
        .state-Using{
          flex: 9 0 auto;
          border-radius: 3px;
          background: #fff;
          position: relative;
          -webkit-box-flex: 5;
          -ms-flex: 5 0 auto;
          display: flex;
          position: relative;
          flex-direction: column;
        }
      }
      .state-bottom{
        /*flex: 5 0 auto;*/
        display: flex;
        flex-direction: column;//上下
        .back-top{
          padding: 10px 5px 10px 0px ;
          float: left;
          line-height: 30px;
          height: 52px;
          border-radius: 3px;
          span{
            float: left;
          }
          button{
            float: right;
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
        .block{
          text-align: center;
          margin: 20px 0px;
        }
        .back-bottom{
          background: #fff;
          flex: 9 0 auto;
          border-radius: 3px;
          background: #fff;
        }
      }
    }
    .state-tor{
      order: 5;
      border-radius: 3px;
      background: #fff;
      flex: 5 0 auto;
      width: 50%;
      text-align: center;
      position: relative;
      .map-bottm{
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .state-top{
        flex: 5 0 auto;
        align-items: center;
        display: flex;
        align-self: center;
        flex-direction: row;
        position: absolute;
        margin-right: 4%;
        z-index:1;
        box-shadow: 2px 2px 5px #ccc;
        .state-round{
          text-align: center;
          line-height: 80px;
          color: #fff;
          font-size: 36px;
          background: linear-gradient(180deg, #fdada2 0px, #ff999d 100%) center center / cover;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin: 20px 30px;
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
        flex: 3 0 auto;
        ul{
          transition:whith  0.4s;
          width: 100%;
          li{
            margin: 7px 10% 7px 0%;
            border-radius: 3px;
            position: relative;
            border-left: 0px !important;
            width: 23%;
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
      }
      .map-button{
        position: absolute;
        top: 45%;
        right: 0px;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        -webkit-transform: translate(-58%, -36%);
        transform: translate(47%, -12%);
        color: #745fea;
        background: #ecf0f3;
        -webkit-transition: ease-in-out 0.4s;
        transition: ease-in-out 0.4s;
        padding: 0px;
        line-height: 23px;
        border:2px solid #fcfcfc;
        box-shadow: 0px 0px 5px #aeaeae;
        &:hover{
          background: #ecf0f3;
          box-shadow: 0px 0px 5px #ecf0f3;
        }
      }
    }
  }
  .map-img{
    img{
      width: 100%;
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
