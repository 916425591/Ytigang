<template>
  <div>
    <!--<p class="back-nav">-->

    <div class="the-car-query">
      <div class="state-from" style="display: flex">

        <el-form ref="userQuery" :model="userQuery" label-width="80px"  >
          <el-form-item label="停车类型" style="width: 18%;float: left">
            <el-col  :span="20">
              <el-select  size="small" v-model="userQuery.carType" class="input-round">
                <el-option v-for="itme in userQuery.carTypes" :label="itme.label" :value="itme.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="停车时间" class="data-item" >
            <el-col :span="6" style="margin-right: 6px">
              <el-select size="small"  v-model="userQuery.period" class="input-round">
                <el-option v-for="itme in userQuery.periods" :label="itme.label" :value="itme.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-date-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="userQuery.date" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center;">-</el-col>
            <el-col :span="8">
              <el-date-picker size="small" class="input-round" type="date" placeholder="选择日期" v-model="userQuery.date1" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="车区" class="data-item">
            <el-col :span="8">
              <el-select size="small"  v-model="userQuery.carArea" class="input-round">
                <el-option v-for="itme in userQuery.carAreas" :label="itme.label" :value="itme.value"></el-option>
              </el-select>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center;">-</el-col>
            <el-col :span="8">
              <el-select size="small" v-model="userQuery.area" class="input-round" placeholder="请选择活动区域">
                <el-option v-for="itme in userQuery.areas" :label="itme.label" :value="itme.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item >
            <el-button type="primary"  size="small" icon="el-icon-search"  round  @click="theCarClick('userQuery')"></el-button>
            <el-button type="danger"  size="small"  round  @click="exports(userQuery)">导出</el-button>
          </el-form-item>
          <!--<el-form-item >-->
            <!--<el-button type="primary"  size="small" icon="el-icon-search"  round  @click="exports(userQuery)">导出</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </div>
      <!---->
    </div>
    <div class="main-car-padding">
      <el-table
        :data="tableData"
        style="width: 100%;background: #000">
        <el-table-column
          align="center"
          label="停车类型"
          width="">
          <template slot-scope="scope">
            <span v-if="scope.row.carType == 1">正常</span>
            <span v-else-if="scope.row.carType == 2" style="color: red">过夜车</span>
            <span v-else-if="scope.row.carType == 3" style="color: red">超时过夜</span>
            <span v-else-if="scope.row.carType == 4" style="color: red">超时停车</span>
            <span v-else-if="scope.row.carType == 5" style="color: red">违规停车</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lntoData"
          empty-text="暂无数据"
          label="进入车辆时间"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="outData"
          empty-text="暂无数据"
          label="驶出车辆时间"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="oftenData"
          empty-text="暂无数据"
          label="停放时长"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="floor"
          empty-text="暂无数据"
          label="楼层"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="carArea"
          empty-text="暂无数据"
          label="车区"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="carPositon"
          empty-text="暂无数据"
          label="车位"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="carCard"
          empty-text="暂无数据"
          label="车牌号"
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
    </div>


  </div>

</template>

<script>
  export default {
    name: "hoursers",
    data(){
      return{
        tableShow:true,
        userQuery:{
          carType:'0',
          carTypes:[
            {
              label:'不限',
              value:'0'
            },
            {
              label:'正常',
              value:'1'
            },
            {
              label:'过夜车',
              value:'2'
            },
            {
              label:'超时过夜车',
              value:'3'
            },
            {
              label:'超时停车',
              value:'4'
            },
            {
              label:'违规停车',
              value:'5'
            }
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
        tableData: [{
          carType:1,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'
        },{
          carType:1,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'

        },{
          carType:3,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'

        },{
          carType:3,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'
        },{
          carType:4,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'
        },{
          carType:4,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'
        },{
          carType:5,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'
        },{
          carType:1,
          lntoData:'2017.11.20 12:00:00',
          outData:'2017.11.20 12:00:00',
          oftenData: '01:30:31',
          floor:'1B',
          carArea:'A',
          carPositon:'AO88',
          carCard:'京 A3023'
        }],
        filts:[

        ],
        input9:'',
        centerDialogVisible:false,
        loading:false,
        newBackWhite:false,
        nawTitle:'',
        newBackInput:'',
        currentPage: 1,
        form:{
        }
      }
    },
    methods: {
      theCarClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           console.log('我查询了',this.userQuery)
          } else {
            return false;
          }
        });
      },
      exports(item){
        console.log('导出',item)
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
    mounted(){

    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/variables.scss";
  .back-nav {
    background: #fff;
    padding: 12px 20px;
    margin: 0px;
    margin-bottom: 20px;
  }
  .back-title{
    float: left;
    text-align: right;
    line-height: 30px;
    width: 100%;
    span{
      float: left;
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
    }
  }
  .block{
    text-align: center;
    margin: 20px 0px;
  }
  .back-i-bulr{
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 25px;
    margin-right:6px;
    background: $green;
  }
  .back-i-red{
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right:6px;
    border-radius: 25px;
    background: $red;
  }
  //弹性布局
  .the-car-query{
    background: #fff;
    margin-bottom: 20px;
    display: flex;
    .state-from{
      display: flex;
      height: 60px;
      padding: 10px 5px 10px 0px;
      float: left;
      background: #fff;
      width: 100%;
      border-radius: 3px;
      .data-item{
        float: left;
        width: 33%;
      }
    }
  }
</style>
