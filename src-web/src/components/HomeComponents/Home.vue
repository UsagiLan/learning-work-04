<template>
  <div class="home">
      <el-container>
          <el-header class="home-header"></el-header>
          <el-main class="home-main">
            <div class="login">
                <span>58同城周报管理平台</span>
                <el-input class='input' placeholder="账号" prefix-icon="el-icon-user-solid" v-model="name"></el-input>
                <el-input  class='input' placeholder="密码" v-model="password" show-password>
                  <i slot="prefix" style="display: flex;align-items: center;">
                  <img style="width:16px;height:16px;margin-top:12px;margin-left:3px" src="../../assets/password.png" alt />
                 </i>
                </el-input>
                 <el-button class='login-button' type="primary" plain @click="login()">登陆</el-button>
            </div>
          </el-main>
          <el-footer></el-footer>
      </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data(){
    return{
      name:'',
      password:'',
      screenWidth: document.body.clientWidth,
    }
  },
 mounted () {
    const that = this;
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth;
            that.screenWidth = window.screenWidth
        })()
    }
},
watch:{
    screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenWidth = val
            this.timer = true
            let that = this
            setTimeout(function(){
                // 打印screenWidth变化的值
                console.log(that.screenWidth)
                that.timer = false
            },400)
        }
    }
},
  methods:{
    login(){
      this.$router.push('/index');//记得传参
      }
    }   
  }
</script>
<style scoped>
 @import "../../style/home.css";
</style>