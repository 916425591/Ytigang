<template>
  <div>

    <div >
      <div class="main-padding stor-var">
        <div class="auth-row">
          <p class="back-title">
            <span><i></i>人员管理与授权</span>
            <el-button round icon="el-icon-plus" size="small" @click="newBack()">新增记录</el-button>
          </p>


          <el-table
            :data="tableData"
            height="100%"
            style="width: 100%;">
            <!--下拉-->
            <el-table-column
              label="编号"
              prop="id"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="name"
              empty-text="暂无数据"
              label="姓名"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="logoinName"
              empty-text="暂无数据"
              label="登陆账号"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="department"
              empty-text="暂无数据"
              label="所属部门"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="role"
              empty-text="暂无数据"
              label="人员角色"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              empty-text="暂无数据"
              label="用户状态"
              align="center"
              width="">
              <template slot-scope="scope">
                <span v-if="scope.row.state==0">已启用</span>
                <span v-else-if="scope.row.state==1" style="color: red">已关闭</span>
              </template>
            </el-table-column>
            <el-table-column
              empty-text="暂无数据"
              label="授权状态"
              align="center"
              width="">
              <template slot-scope="scope">
                <span v-if="scope.row.author==0">已授权</span>
                <span v-else-if="scope.row.author==1" style="color: red">未授权</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="操作"
              width="300px">
              <template slot-scope="scope">
                <el-button size="mini" round  @click="handleClick(scope.row,$event)" ><i class="back-i-bulr"></i>编辑</el-button>
                <el-button size="mini" round  @click="treeClick(scope.row,$event)" ><i class="back-i-yellow"></i>授权</el-button>
                <el-button  size="mini" round @click="backDelete(scope.row,$event)" type="info"><i class="back-i-red"></i>删除</el-button>
              </template>
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
    </div>
    <!--新增-->
    <el-dialog
      :title="nawTitle"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="newBackWhite"
      width="30%"
      top="35vh"
      :before-close="handleClose">
      <el-form ref="newFrom" :model="newFrom" label-width="80px">
        <el-col :span="12">
          <el-form-item label="人员名称">
            <el-input v-model="newFrom.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="所属部门">
          <el-input v-model="newFrom.names"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="登陆名">
          <el-input v-model="newFrom.landingName"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="登陆密码">
          <el-input v-model="newFrom.landingPwd"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="人员状态">
            <el-radio-group v-model="newFrom.resource">
              <el-radio label="启用"></el-radio>
              <el-radio label="不启用"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newBackWhite = false" type="text">取 消</el-button>
        <el-button type="primary" size="small" round @click="newBackWhiteClick(newFrom)">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="人员编辑"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="centerDialogVisible"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="12"><el-form-item label="编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>

        </el-form-item>
        </el-col>
          <el-col :span="12"><el-form-item label="登陆账号">
            <el-input v-model="form.logoinName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="所属部门">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="角色状态">
          <el-radio-group v-model="form.state">
            <el-radio label="0">已启用</el-radio>
            <el-radio label="1">未启用</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="授权状态">
            <el-radio-group v-model="form.author">
              <el-radio label="0">已授权</el-radio>
              <el-radio label="1">未授权</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button right @click="centerDialogVisible = false" type="text">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit(form)">确 定</el-button>
      </span>
    </el-dialog>
    <!--授权-->
    <el-dialog
      title="角色授权"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="treeDialog"
      width="30%"
    >
      <p>菜单授权</p>
      <el-tree
        :data="data2"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
      <el-button right @click="treeDialog = false" type="text">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="treeClickTrue()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: "hoursers",
    data(){
      return{
        tableShow:true,
        tableData: [{
          id:'01',
          name: '张三',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"0",
        },{
          id:'02',
          name: '数据分析员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"0",
        },{
          id:'03',
          name: '信息检索员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"0",

        },{
          id:'04',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"1",
          author:"0",
        },{
          id:'05',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"1",
        },{
          id:'06',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"1",
        },{
          id:'07',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"1",
          author:"0",
        },{
          id:'08',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"1",
        },{
          id:'09',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"0",
        },{
          id:'10',
          name: '黑白名单管理员',
          logoinName:'admin',
          department:'采购部',
          role:'黑白名单',
          state:"0",
          author:"0",
        }],
        filts:[

        ],
        centerDialogVisible:false,
        loading:false,
        newBackWhite:false,
        nawTitle:'',
        newBackInput:'',
        currentPage: 1,
        form:{
        },
        newFrom:{
          treeId:1,
          name:'总裁办',
          treeIds:2,
          names:'研发部',
          landingPwd:'12345',
          landingName:'admin'
        },
        //树组件
        treeDialog:false,
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      home() {
        this.$router.push("/view/home/housers/hosersCode");
      },
      clickNotes(){
        this.$router.push("/view/home/housers/notes");
      },
      //授权
      treeClick(){
        this.treeDialog=true;
      },
      treeClickTrue(){
        this.loading=true;
        setTimeout(()=>{
          this.loading=false;
          this.treeDialog=false;
          this.$notify({
            title: '成功',
            message: '已经完成修改',
            duration:1000,
            type: 'success'
          });
        },500)
      },
      //查看
      handleClick(row,event) {
        event.cancelBubble = true;
        this.centerDialogVisible=true;
        this.form = { //直接赋值可能是因为elenmet 方法把row进行数据绑定了
          id:row.id,
          name: row.name,
          logoinName:row.logoinName,
          department:row.department,
          role:row.role,
          state:row.state,
          author:row.author,
        };
      },
      //编辑确定
      onSubmit(form) {//导致row会全局引用
        this.loading=true;
        setTimeout(()=>{
          this.loading=false;
          this.centerDialogVisible=false;
          this.$notify({
            title: '成功',
            message: '已经完成修改',
            duration:1000,
            type: 'success'
          });
        },500)
        console.log(form);
      },
      clickTree(){
        this.tableData.forEach((item)=>{
          if(item.name =="王老二" ){
            item.test+=1;
          }
        })
      },
      //编辑
      editorClick(row,event) {
        event.cancelBubble = true;
      },
      //选中当前行
      tableClick(row, event, column) {
        row.test+=1;
      },
      tableRowClassName({row}) {
        if (row.test%2==0) {
          return 'warning-row';
        } else if (row.test%2!=0) {
          return 'success-row';
        }
        return '';
      },
      tableTd(row){
        if (row.test%2==0) {
          return 'warning-row';
        } else if (row.test%2!=0) {
          return 'success-row';
        }
        return '';
      },
      //新增
      newBack(item){
        this.nawTitle='新增人员信息'
        this.newBackWhite =true
      },
      newBackWhiteClick(newFrom){
        console.log(newFrom)
        this.newBackWhite =false
      },
      handleClose(done) {
        this.nawTitle='',
          this.newBackWhite =false
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      backDelete(item){
        console.log(item)
        if(item){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }

    },
    mounted(){

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/variables.scss";
  .back-nav {
    background: #fff;
    padding: 12px 20px;
    margin: 0px;
    margin-bottom: 20px;
  }
  .auth-row{
    display: flex;
    height: calc(100% - 120px);
    /*width: calc(100% - 226px);*/
    width: 100%;
    flex-direction: column;
    .el-table{
      flex: 6 0 auto;
    }
    .back-title{
      flex: 1 0 auto;
      float: left;
      text-align: right;
      line-height: 30px;
      width: 100%;
      span{
        color: #7362e4;
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
      flex: 1 0 auto;
      text-align: center;
      margin: 20px 0px;
    }
  }
  .back-i-bulr{
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 25px;
    margin-right:6px;
    background: $green;
  }
  .back-i-yellow{
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 25px;
    margin-right:6px;
    background: $yellow;
  }
  .back-i-red{
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right:6px;
    border-radius: 25px;
    background: $red;
  }
</style>
