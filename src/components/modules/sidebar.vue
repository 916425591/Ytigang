
<template>
  <div class="sidebar">
    <el-col :span="24">
      <el-menu
        :default-active="siderNumber"
        class="el-menu-vertical-demo"
        background-color="#283345"
        text-color="#fff"
        @select="handleSelect"
        active-text-color="#ffd04b">

        <el-menu-item v-for="(item,i) in sideBarData" :index="item.id">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <el-submenu :index="sideBar.id">
          <template slot="title">
            <i :class="sideBar.icon"></i>
            <span>{{sideBar.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item,i) in sideBar.mentNode" :index="item.id">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>


      </el-menu>
    </el-col>
  </div>
</template>

<script>
  //import {addNote,deleteNote,toggleFavorite} from "../../store/actions";//利用actions 调用mutations 中的方法 坑死人
  import { mapGetters, mapActions } from 'vuex'
  export default {
        data() {
          return {
            isCollapse: true,
            sideBarData:[{
               id:'1',
               icon:'el-icon-location',
               name:'车位状态图',
               url:'/info',
            },{
              id:'2',
              icon:'el-icon-tickets',
              name:'车位利用率',
              url:'/vehicleUsing',
            },{
              id:'3',
              icon:'el-icon-tickets',
              name:'黑白名单',
              url:'/backWhite',
            },{
              id:'4',
              icon:'el-icon-tickets',
              name:'停车日志',
              url:'/theCarLog',
            },{
              id:'6',
              icon:'el-icon-tickets',
              name:'照明系统',
              url:'/lighting',
            },{
              id:'7',
              icon:'el-icon-tickets',
              name:'环境系统',
              url:'/environment',
            }],
            sideBar:{
                id:'8',
                icon:'el-icon-menu',
                name:'系统管理',
                // url:'/view/home/backWhite',
                mentNode:[
                  {
                    id:'9',
                    icon:'el-icon-remove-outline',
                    name:'通用设置',
                    url:'/system/general',
                  },
                  {
                    id:'10',
                    icon:'el-icon-remove-outline',
                    name:'部门信息管理',
                    url:'/system/information',
                  },
                  {
                    id:'11',
                    icon:'el-icon-remove-outline',
                    name:'角色管理与授权',
                    url:'/system/authorization',
                  },
                  {
                    id:'12',
                    icon:'el-icon-remove-outline',
                    name:'人员管理与授权',
                    url:'/system/personnel',
                  },
                  {
                    id:'13',
                    icon:'el-icon-remove-outline',
                    name:'敏感操作日志',
                    url:'/system/sensitiveLog',
                  },
                  {
                    id:'14',
                    icon:'el-icon-remove-outline',
                    name:'车位管理',
                    url:'/system/parkingSpace',
                  }
                ]
              },
              keyIndex:this.$store.state.sidebarNumber
          };
        },
        methods: {
          handleSelect(key, keyPath) {
            if(key<8){
              this.sideBarData.forEach((item)=>{
                if(item.id == key){
                  this.$router.push(item.url)
                }
              })
            }else{
              this.sideBar.mentNode.forEach((item)=>{
                if(item.id == key){
                  this.$router.push(item.url)
                }
              })
            }
          }
        },
        computed:{
          siderNumber(){
            return this.$store.state.sidebarNumber
          }
        },
        mounted(){

        }
    }
</script>
<style scoped lang="scss">
  @import "../../style/variables.scss";
.sidebar{
  background: $deepBlue;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 226px;
    min-height: 400px;
  }
  .el-menu{
    border-right:0px ;
  }
</style>
