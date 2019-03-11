<template>
	<div class="container-fluid">
        <div class="nullNews" v-if="comment.length == 0">
                  <p class="nullNews-font">没有消息...</p>
        </div>
        <div v-else>
		 <div class="comment-main" v-for="(item ,index ) in comment" :value="index" :key="item.id">
            <div v-if="item.showType== 1">
                  <new-notice :item="item" :index="index"></new-notice>
            </div><!--公告-->
            <div v-if="item.showType == 2">
                <add-answer-component :item = "item" :index="index" @addComment= 'addComment' @deleteCommentFun = 'deleteCommentFun'></add-answer-component>
                    
            </div><!--评论的用户头像和评论回复区域--><!--评论-->
        </div>         
         <el-pagination layout="prev, pager, next" :total=totalElement :page-size='10' class="page-style"  
            @current-change='currentPage'></el-pagination>  
        </div>
	</div>
</template>

<script>
import '../../../assets/picture/workDetailcss.css'
import AddAnswerComponent from  './answerComment.vue'
import newNotice from './newNotice.vue'
import { constants } from 'fs';


export default {
    name: 'noticeMail',
    props:['comment','totalElement'],
    components:{
            'add-answer-component':AddAnswerComponent,
            'new-notice':newNotice
    },
    
    data () {
	  return {
            answerCommentUser:'',
            /*绑定某个回复框*/
            commentIndex:-1,
            /*回复评论的内容*/
            answerCommentValue:'',
            page:1

	  }
    },
    methods:{
      //获取站内信
        //改变页数
        currentPage(value){
            this.$emit('currentPage',{pageNum:value})
        },
        addComment(value){
            let index = value[0];
            let data = value[1]
            this.comment[index].children.push(data);
        },
          deleteCommentFun(value){
             let item = value[0];
            let index = value[1]
            this.comment[item].children.splice(index,1)
        }
    }
}
	
</script>

<style scoped>

</style>