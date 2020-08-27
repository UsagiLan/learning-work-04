<template>
    <el-container class="mail">
        <el-header class="mail-head" style="height:136px">
            <el-container class="mail-intro">
                <el-aside style="width:50px">
                    <i class="el-icon-back mail-intro-icon" @click="handleClick()"></i>
                </el-aside>
                <el-main class="mail-intro-info">
                    <div>
                        <span>主题：</span>
                        <span>{{this.mail.title}}</span>
                    </div>
                    <div>
                        <span>发件人：</span>
                        <span>{{this.mail.name}}</span>
                    </div>
                    <div>
                        <span>时&nbsp;&nbsp;&nbsp;间:</span>
                        <span>{{this.mail.time}}</span>
                    </div>
                    <div>
                        <span>收件人：</span>
                        <span>{{this.mail.to}},{{this.mail.copy}}</span>
                    </div>
                </el-main>
            </el-container>
        </el-header>
        <el-main class="mail-content">
            <div></div>
            <div class="content">{{this.mail.content}}</div>
        </el-main>
    </el-container>
</template>
<script>
export default {
    name:'look',
    data(){
        return{
            mail:{},
        }
    },
    beforeMount(){
       this.mail=this.$store.state.mail;
    },
    methods:{
        handleClick(){
            this.$router.replace('/index')
        }
    }
}
</script>

<style scoped>
@import url('../../style/look.css');
</style>
