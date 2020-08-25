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
                      <el-button type="text" @click="go()">退出登陆</el-button>
                  </span>
             </div>
            </el-col>
            </el-row>
           </el-header>
           <el-container class="index-container">
               <el-aside  class='index-aside' width="200px">
                  <el-row class="tac" width='200px'> 
                    <el-col :span="12">
                        <el-menu  class="el-menu-vertical-demo,item-url" >
                            <router-link to='/editLetter'>
                                <el-menu-item >
                                    <i class="el-icon-edit"></i>
                                    <span slot="title">写信</span>
                                    <!-- <router-link to='/editLetter'>写信</router-link> -->
                                </el-menu-item>
                            </router-link>
                             <router-link to='/inbox'>
                                 <el-menu-item >
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">收件箱</span>
                                <!-- <router-link to='/inbox'>收件箱</router-link> -->
                                 </el-menu-item>
                            </router-link>
                            <router-link to='/sendbox'>
                               <el-menu-item >
                                   <i class="el-icon-circle-check"></i>
                                   <span slot="title">已发送</span>
                               <!-- <router-link to='/sendbox'>已发送</router-link> -->
                               </el-menu-item>
                            </router-link>
                            <router-link to='/deletebox'>
                                <el-menu-item >
                                  <i class="el-icon-delete"></i>
                                  <span slot="title">已删除</span>
                               <!-- <router-link to='/deletebox'>已删除</router-link> -->
                               </el-menu-item>
                            </router-link>
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
  methods:{
      go(){
          this.$router.replace({path:'/'});
          console.log('点击一次')
      }
  }
}
</script>

<style lang='less' scoped>
 @import "../../style/index.css";
</style>