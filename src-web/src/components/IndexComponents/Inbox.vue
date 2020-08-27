<template>
    <div>
        <!-- 统计所有的收件箱数 -->
        <div class="totalNumber">
            <span>收件箱（共{{number}}封）</span>
        </div>
        <!-- 显示具体的收件箱并给每条信息点击绑定事件可以具体查看 -->
        <div>
             <el-table :data="data" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="发件人" width="180"></el-table-column>
                <el-table-column prop="subject" label="主题"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <!-- <template slot-scope="scope"> -->
                        <template v-slot:default="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
               </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:'inbox',
    data(){
       return{
         number:0,
         data:[
             {date:'2020-5-6',name:'李明',subject:'我是李明，为文复活复活办法'},
             {date:'2020-5-7',name:'李红',subject:"我是李红，也诶i死i会发生啦哈哈"},
             {date:'2020-6-6',name:'小花',subject:'大家好，我的迷你就是你的西宁安徽'},
             {date:'2020-8-6',name:'李明',subject:'我是李明，为文复活复活办法'},
             {date:'2020-5-26',name:'李红',subject:"我是李红，也诶i死i会发生啦哈哈"},
             {date:'2020-5-16',name:'小花',subject:'大家好，我的迷你就是你的西宁安徽'},
             {date:'2020-7-26',name:'李明',subject:'我是李明，为文复活复活办法'},
             {date:'2020-5-3',name:'李红',subject:"我是李红，也诶i死i会发生啦哈哈"},
             {date:'2020-5-7',name:'小花',subject:'大家好，我的迷你就是你的西宁安徽'},
             {date:'2020-9-6',name:'李明',subject:'我是李明，为文复活复活办法'},
             {date:'2019-5-6',name:'李红',subject:"我是李红，也诶i死i会发生啦哈哈"},
             {date:'2029-5-6',name:'小花',subject:'大家好，我的迷你就是你的西宁安徽'},
             {date:'2029-8-6',name:'李明',subject:'我是李明，为文复活复活办法'},
             {date:'2020-4-20',name:'李红',subject:"我是李红，也诶i死i会发生啦哈哈"},
             {date:'2020-5-6',name:'小花',subject:'大家好，我的迷你就是你的西宁安徽'},
             {date:'2020-5-6',name:'李明',subject:'我是李明，为文复活复活办法'},
             {date:'2020-5-6',name:'李红',subject:"我是李红，也诶i死i会发生啦哈哈"},
             {date:'2020-5-6',name:'小花',subject:'大家好，我的迷你就是你的西宁安徽'}  
         ],
         info:{}
       }
   },
   beforeMount(){
       var i=0;
       for(let item in this.data){
              console.log(item);
             i++;
       }
       this.number=i;
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