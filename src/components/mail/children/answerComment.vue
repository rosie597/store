<template>
	<div >
        <div class="comment-head"><img :src="item.sendAvatar"></div><!--评论的用户头像-->
        <div class="comment-content">
            <div class="commentuser-margin-bottom">
                <span class="font-span commentuser-margin-right-17">{{item.sendNickname}}</span>
                <!--action 3 为评论 4为回复-->
                <!--targetType = 1为 作品  2为评论-->
                <span v-if="item.action === 3" class="font-span commentuser-margin-right">评论了你的作品《{{item.targetName}}》</span>
                <span v-if="item.action === 4" class="font-span commentuser-margin-right">回复了你在作品《{{item.targetName}}》的评论</span>
                <em  class="font-em">{{item.sendDate}}</em>
                    <span class="font-span answer-style" @click="showAnswerStyle(item,index)">回复</span>
            </div><!--评论的人名和时间-->
            
            <div><p class="font-span margin-bottom-16 ">{{item.sendCommentContent}}</p></div><!--评论的内容-->
            <answer-component :item="item" :index="index" :commentIndex="commentIndex" @changeCommentIndex = 'changeCommentIndex'  @addAnswerFun = 'addAnswerFun' @deleteComment= 'deleteComment'></answer-component>
        </div><!--评论回复内容区域-->
	</div>
</template>

<script>
import '../../../assets/picture/workDetailcss.css'
import answerComponent from './answer'
import { constants, copyFile } from 'fs';
export default {
    name: 'noticeMail',
    props:['item','index'],
    components:{
       'answer-component': answerComponent
    },
    data () {
	  return {
            /**回复评论的用户名： 回复XX (placeholder)*/
            answerCommentUser:'',
            /*绑定某个回复框*/
            commentIndex:-1,
            
            /*回复评论的内容*/
            answerCommentValue:'',
	  }
    },
  
    methods:{
         /* 点击评论图标，展示回复框*/
        showAnswerStyle(item,index){
            this.commentIndex = this.commentIndex === index ? -1 : index;
            if(this.commentIndex === index){
                 this.answerCommentUser = '回复'+ item.sendNickname;
            }
        },
        //隐藏回复
        changeCommentIndex(){
            this.commentIndex = -1;
        },
        
       addAnswerFun(value){
           this.$emit('addComment',value);
        //    this.$emit('addComment2',value);
       },
        CommentCurrentPage(page){
            //  this.page = page;
            this.$emit('CommentCurrentPage',[{pageNum:page},{type:2}])
        },
        //删除回复
        deleteComment(value){
            this.$emit('deleteCommentFun',value);
        }
    }
}
	
</script>

<style scoped>
   


/*本页面*/
/*删除评论*/
    .deleteBtn{
        text-align: right;
        padding-top: 5px;
    }
    /*删除按钮的样式*/
    .deleteStyle{
        color: #515151;
        cursor: pointer;
    }
    .deleteStyle:hover{
        color:#aba2a2
    }
</style>