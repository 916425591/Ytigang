<template>
  <div class="header">


        <img src="~@/assets/images/logo.jpg" />
        <div class="grid-row">

            <span class="pjt-name">后台反寻系统</span>
          <div class="header-right">
            <el-col class="header-admin">
              <img src="~@/assets/images/admin.jpg" class="admin-icon"/>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-badge :value="3" class="item">
                      消息
                    </el-badge>
                  </el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item><span @click="modify()">修改密码</span></el-dropdown-item>
                  <el-dropdown-item><span @click="exitLog()">退出</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
        </div>

    <!--退出-->
    <el-dialog
      title="退出登陆"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="exitVehicle"
      top="35vh"
      width="30%"
    >
      <p>
        确定要退出系统吗？
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitVehicle = false" type="text">取 消</el-button>
        <el-button type="primary" size="small" round @click="exitNotLog()">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改密码-->
    <el-dialog
      title="修改密码"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="modifyDialog"
      width="30%"
      top="35vh"
      :before-close="handleClose">
      <el-form ref="modifyform" :rules="rules" :model="modifyform" label-width="88px">
        <el-form-item label="原密码" prop="name">
          <el-input v-model="modifyform.name"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
          <el-input v-model="modifyform.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="pwds">
          <el-input v-model="modifyform.pwds"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false" type="text">取 消</el-button>
        <el-button type="primary" size="small" round @click="modifyClick(modifyform)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    //import {add} from "../../store/actions";//利用actions 调用mutations 中的方法重大失误
    import  {mapActions} from 'vuex'
    export default {
        name: "headers",

        data(){
          var name = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              callback();
            }
          };
          var pwd = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {

              callback();
            }
          };
          var pwds = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.modifyform.pwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return{
            msg:"我是你们的头部",
            imgIcon:'~@/assets/images/logo.jpg',
            exitVehicle:false,
            modifyDialog:false,
            modifyform:{
              name: '',
              pwd: '',
              pwds: '',
            },
            rules:{
              name:[
                { validator: name, trigger: 'blur' },
              ],
              pwd: [
                { validator: pwd, trigger: 'blur' }
              ],
              pwds: [
                { validator: pwds, trigger: 'blur' }
              ]
            }
          }
        },
      // computed: mapState(["todos"]),
      computed:{

      },
      mounted(){

      },
      methods:{
        exitLog(){
          this.exitVehicle= true
        },
        exitNotLog(){
          console.log('我退出了')
          this.$router.push("/");
          this.exitVehicle= false
          //退出清除缓存
        },
        modify(){
          this.modifyDialog=true
        },
        handleClose() {
          this.modifyDialog=false
        },
        modifyClick(){
          console.log('我修改密码了')
          this.modifyDialog=false;
        }
      },
    }
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  display: flex;
  position: relative;
  height: 81px;
  button{
    background: transparent;
    color: #666;
    border: none;
    i{
      font-size: 26px;
      position: relative;
      top: 5px;
      margin-right: 3px;
    }
  }
}
  .t-btn{
    position: absolute;
    top: 28px;
    width: 24px;
    height: 26px;
    cursor: pointer;
  }
.t-btn-span{
  position: absolute;
  left: 0;
  width: 24px;
  height: 4px;
  content: '';
  background: #fff;
}
.t-btn-span:before,.t-btn-span:after{
  position: absolute;
  left: 0;
  width: 24px;
  height: 4px;
  content: '';
  background: #fff;
}

.t-btn-span:before{
  top: 0;
  -webkit-transform: translateY(-7px);
  transform: translateY(-7px);
  -webkit-transition: all .3s;
  transition: all .3s;
}
.t-btn-span:after{
  -webkit-transform: translateY(7px);
  transform: translateY(7px);
  -webkit-transition: all .3s;
  transition: all .3s;
}
  .pjt-name{
   font-size: 20px;
    font-weight: 700;
  }
  .grid-row{
    line-height: 81px;
    text-align: center;
    flex: 10 0 auto;
  }
  .grid-row .el-dropdown{
    cursor: pointer;
  }
  .header-right{
    float:right;
    position: absolute;
    right: 0px;
    top: 0px;
    .header-admin{
      margin-left: 20px;
      width: 200px;
      float: right;
      border-left:1px solid #ccc;
    }
    .admin-icon{
      height: 40px;
      width: 40px;
      border-radius: 50px;
      position: relative;
      top: 15px;
    }
  }
</style>
