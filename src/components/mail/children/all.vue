<template>
	<div class="container-fluid">
        <div class="nullNews" v-if="comment.length == 0">
                  <p class="nullNews-font">没有消息...</p>
        </div>
        <div v-else>
           <div class="comment-main" v-if="$store.state.regist">
                <div class="comment-head">
                    <span v-if="true"   class="notice-icon" >  
                        <span    class="notice-icon-font" >公</span>  
                    </span>
                </div><!--公告-->
                <div class="comment-content">
                    <div class="commentuser-margin-bottom">
                        <span  class="font-span commentuser-margin-right">{{welcome}}</span>
                    </div>
                    <!--评论的人名和时间-->
                </div><!--评论回复内容区域-->
            </div>
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
            page:1,
            welcome:" 等你很久了，朋友，欢迎你加入彩罐网。 \r\n 在这里，我们以“艺术”会友，作品、摄影、内容，都将会是我们的交谈核心； \r\n 在这里，你会遇到和你一样的，追求艺术，追求美，追求心之所向的朋友； \r\n 在这里，你会凭借着你的艺术感悟收获一大波小粉丝； \r\n 在这里，你可以记录下，你在”艺术之路”上成长的点点滴滴，这里就是你的艺术作品相册。 \r\n 开始吧，开始你的艺术之旅。对彩罐网有任何意见和建议，欢迎发送邮件至wewant@xinly.com.cn，让我们共同进步。\r\n最后，再一次，欢迎你加入彩罐网，收藏色彩，分享快乐。"
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
        .font-span{
            white-space: pre;
        }
</style>