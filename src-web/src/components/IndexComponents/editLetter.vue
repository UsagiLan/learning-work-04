<template>
    <div class="edit">
        <div class="sendLetter">
            <el-button>发送</el-button>
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
            <table>
                <tr>
                    <td class="content-name">正&nbsp;&nbsp;&nbsp;文</td>
                    <td>
                        <textarea name="letter" cols="67" rows="20" wrap=“physical/(hard)” v-model="content"></textarea>
                    </td>
                </tr>
            </table>    
        </div>
       </div>
     </div>
</template>
    <script>
    export default {
       name:'editLetter',
       data(){
           return{
               inputname:'',
               inputsubject:'',
               content:''
           }
       }
    }
    </script>

<style scoped>
@import '../../style/editLetter.css';
</style>