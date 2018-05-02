<template>
  <div class="par-state main-padding">
    <div class="state-one">
      <div class="state-top">
        <div class="state-round">{{floorName}}<div class="state-box"></div></div>
      </div>
      <div class="state-bottom">
        <ul>
          <li v-for="item in stateData" :style="{border:'1px solid #'+item.back+''}">
            <span :style="{background:'#'+item.back+''}"></span><i :style="{borderRight:'1px solid #'+item.back+''}"></i>{{item.name}}：{{item.numberSize}}
          </li>
        </ul>
      </div>
    </div>
    <div class="state-tor">
      <div class="the-map" id="BeefindMap">
      </div>
      <button class="map-button" @click="nextFloor()">下一层</button>
      <button  class="map-button" style=" top: 70%" @click="openDialog" >弹出</button>
      <button  class="map-button" style=" top: 30%" @click="mapImg" >地图弹框</button>
    </div>
    <!--消息弹窗-->
    <dialog-msg :title="diaglogMsg" :msgType="0" :msgData="diagloMsg" @getAll="parkinMsg"  v-if="dialogVisible"></dialog-msg>
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
  import  dialogMsg from '@/components/modules/dialogMsg'
  export default {
    name: "parking-state",
    components:{dialogMsg},
    data(){
      return{
        stateMsg:true,
        dialogVisible:false,
        mapVehicle:false,
        diaglogMsg:'警告',
        diagloMsg:{
          name:'京A.13232323',
          id:'P1#A012',
          type:0
        },
        //当前楼层名称
        floorName:"",
        //占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
        stateData:[],
      }
    },
    created(){
      this.initParkinfo();
    },
    mounted(){
      //创建地图
      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'BeefindMap',
        view: new ol.View({
          center: [0, 0],
          zoom: 2
        })
      });
    },
    methods:{
      //地图弹窗
      mapImg(){
        this.mapVehicle=true
      },
      mapDialog(){
        this.mapVehicle=false
      },
      parkinMsg(data){
        this.dialogVisible = data.type
        console.log(data)
      },
      //初始化查询出来的占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
      initParkinfo(){

        var self=this;
        //向后台请求数据示例
        var reqData= {
          username: '1001',
          password: '123456'
        };
        self.$http.post('http://localhost:8014/api/Sys/Login',reqData,{dataType:'jsonp'})
          .then(data => {
            if(data.status==200){
              console.log('登录成功');
            }
            else{
              console.log('登录失败');
            }
          })
          .catch(function (error) {
            console.log('登录失败');
            console.log(error);
          });







        this.floorName="B1"; //改变楼层
        this.stateData=[
          {
            name:'占用数',
            numberSize:84,
            back:'fd435a'
          },
          {
            name:'空余数',
            numberSize:84,
            back:'85e249'
          },
          {
            name:'超时停车',
            numberSize:84,
            back:'ffbb44'
          },
          {
            name:'黑名单',
            numberSize:84,
            back:'000000'
          },
          {
            name:'违规停车',
            numberSize:84,
            back:'4882ff'
          },
          {
            name:'特殊车辆',
            numberSize:84,
            back:'d1980d'
          },
        ]
      },

      stateClose(){
        console.log('我关闭了')
      },
      stateClick(){
        console.log('查看')
      },
      //下一层
      nextFloor(){
        var self=this;
        self.floorName="B2";

      },
      //打开警告弹窗
      openDialog(){
        this.dialogVisible=true;
        //暂时没写
      },


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
      order: 1;
      flex: 1 0 auto;
      border-radius: 3px;
      background: #fff;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      .state-top{
        flex: 5 0 auto;
        align-items: center;
        display: flex;
        align-self: center;
        .state-round{
          text-align: center;
          line-height: 160px;
          color: #fff;
          font-size: 36px;
          background: linear-gradient(180deg, #fdada2 0px, #ff999d 100%) center center / cover;
          border-radius: 50%;
          width: 160px;
          height: 160px;
        }
        .state-box{
          height: 9px;
          border-radius: 10px;
          width: 100px;
          margin: 0 auto;
          -webkit-box-shadow: 0px 10px 10px #ffc4c8;
          box-shadow: 0px 21px 25px #ffc4c8;
          position: relative;
          top: -15px;
          /* z-index: 111; */
        }
      }
      .state-bottom{
        flex: 3 0 auto;
        ul{
          li{
            width: 80%;
            padding:5px 10px 5px 18px;
            margin: 2px 8% 30px 12%;
            border-radius:3px ;
            position: relative;
            border-left:0px !important;
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
    }
    .state-tor{
      order: 9;
      border-radius: 3px;
      background: #fff;
      flex: 9 0 auto;
      text-align: center;
      position: relative;
      .the-map{
        //  position: relative;
        width: 70%;
        margin: 20px auto;
        height: calc(100% - 40px);
        display: inline-block;
        /*img{*/
        /*position: absolute;*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*left: 0px;*/
        /*}*/
      }
      .map-button{
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
        &:hover{
          background: #745fea;
          color: #fff;
          box-shadow: 0px 0px 5px #745fea;
        }
      }
    }
  }

</style>
