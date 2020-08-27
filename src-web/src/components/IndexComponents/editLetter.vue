<template>
    <div class="edit">
        <div class="sendLetter">
            <el-button @click="sendClick">发送</el-button>
            <el-button>添加抄送</el-button>
            <el-button>关闭</el-button>
        </div> 
        <div class="demo-input-suffix">
            <div class="input1">
               <span>收件人&nbsp;</span>
               <el-input class='addressor' suffix-icon="el-icon-circle-plus-outline" v-model="inputname"></el-input>
            </div>
          <div class='input2'>
              <span>主&nbsp;&nbsp;&nbsp;题&nbsp;</span>
              <el-input class='subject' v-model="inputsubject"> </el-input>
          </div>
        <div class="edit-content">
            <span>正&nbsp;&nbsp;&nbsp;文&nbsp;</span>
            <textarea name="letter"  wrap=“physical/(hard)” v-model="content"></textarea>
        </div>
       </div>
     </div>
</template>
    <script>
    import {sendWeekly} from '@/services/index'
    export default {
       name:'editLetter',
       data(){
           return{
               inputname:'',
               inputsubject:'',
               content:''
           }
       },
       methods:{
           sendClick() {
               let {inputname, inputsubject, content} = this;
               let body = {
                   username: "wangsi",
                   to: [inputname],
                   copy: [],
                   title: inputsubject,
                   content
               }
               sendWeekly(body).then(res => {
                   console.log(res)
               })
           }
       }
    }
    </script>

<style scoped>
@import '../../style/editLetter.css';
</style>