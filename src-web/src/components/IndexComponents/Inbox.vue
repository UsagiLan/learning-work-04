<template>
    <div>
        <!-- 统计所有的收件箱数 -->
        <div class="totalNumber">
            <span>收件箱（共{{this.data.length}}封）</span>
        </div>
        <!-- 显示具体的收件箱并给每条信息点击绑定事件可以具体查看 -->
        <div>
             <el-table :data="data" style="width: 100%">
                <el-table-column prop="time" label="日期" width="200"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="title" label="主题"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                        <template v-slot:default="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
               </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {getReceiveList} from '@/services/index.js'
export default {
    name:'inbox',
    data(){
       return{
            data:[],
       }
   },
   mounted() {
       getReceiveList({username: "lizhen"}).then(res => {
           console.log(res)
           this.data = res.data;
       })
   },
   methods: {
      handleClick(row) {
          //跳转路由，跳转到邮件查看页面
          this.$router.replace({path:'/look'});
          //将该条邮件信息传到查看页面
          this.$store.dispatch('getMail',row);
      },
    }
}
</script>
<style scoped>
@import url('../../style/inbox.css');
</style>