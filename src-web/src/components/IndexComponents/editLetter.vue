<template>
    <div class="edit">
        <div class="sendLetter">
            <el-button @click="sendClick">发送</el-button>
            <el-button>添加抄送</el-button>
            <el-button>关闭</el-button>
        </div> 
        <div class="demo-input-suffix">
            <div class="index input1">
               <span>收件人</span>
               <!-- <div class="index">收件人</div> -->
               <el-input class='addressor' suffix-icon="el-icon-circle-plus-outline" v-model="inputname"></el-input>
            </div>
          <div class='index input2'>
              <span>主题</span>
                <!-- <div class="index">主题</div> -->
               <el-input class='subject' v-model="inputsubject"> </el-input>
          </div>
        <div class="index edit-content">
            <!-- ç -->
              <!-- <div class="index"> -->
                   <span>正文</span>
              <!-- </div> -->
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