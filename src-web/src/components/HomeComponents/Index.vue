<template>
   <div>
       <el-container>
           <el-header class="index-header">
           <el-row :gutter="20">
            <el-col :span="16">
            <div >欢迎来到58同城周报管理平台</div>
            </el-col>
             <el-col :span="8">
             <div class='iconspan' >
                  <el-avatar class='el-avatar-span' icon="el-icon-user-solid"></el-avatar>
                  <span>
                      <el-button type="text">退出登陆</el-button>
                  </span>
             </div>
            </el-col>
            </el-row>
           </el-header>
           <el-container class="index-container">
               <el-aside  class='index-aside' width="200px">
                  <el-row class="tac" width='200px'> 
                    <el-col :span="12">
                        <el-menu  class="el-menu-vertical-demo" >
                            <el-menu-item >
                                <i class="el-icon-edit"></i>
                                <router-link to='/editLetter'>写信</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <i class="el-icon-menu"></i>
                                <router-link to='/inbox'>收件箱</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <i class="el-icon-circle-check"></i>
                               <router-link to='/sendbox'>已发送</router-link>
                            </el-menu-item>
                            <el-menu-item >
                                <i class="el-icon-delete"></i>
                               <router-link to='/deletebox'>已删除</router-link>
                            </el-menu-item>
                        </el-menu>
                    </el-col> 
                  </el-row>
               </el-aside>
               <el-main class="index-main">
                   <router-view></router-view> 
               </el-main>
           </el-container>
       </el-container>
   </div>
</template>
<script>
export default {
  name:'index',
  data(){
      return{}
  },
  method:{

  }
}
</script>

<style lang='less' scoped>
 @import "../../style/index.css";
</style>