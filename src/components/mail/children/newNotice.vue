<template>
	<div >
           <div class="comment-head">
                <span v-if="item.sendAvatar === null"   class="notice-icon" >  
                    <span    class="notice-icon-font" >公</span>  
                </span>
                <img v-if="item.sendAvatar" :src="item.sendAvatar">
                </div><!--公告-->
                <div class="comment-content">
                <div class="commentuser-margin-bottom">
                    <span v-if="item.sendAvatar === null" class="font-span commentuser-margin-right">公告</span>
                    <span v-else class="font-span commentuser-margin-right">{{item.sendNickname}}</span>
                    <em class="font-em">{{item.sendDate}}</em>
                    </div>
                <!--评论的人名和时间-->
                    <div>
                        <!--点赞1 收藏2 评论3 回复4 关注5 公告6-->
                        <p  v-if="item.action === 1" class="font-span margin-bottom-16">点赞了你的作品《{{item.targetName}}》</p>
                        <p  v-if="item.action === 2" class="font-span margin-bottom-16">收藏了你的作品《{{item.targetName}}》</p>
                        <!-- <p  v-if="item.action === 3" class="font-span margin-bottom-16">{{item.sendCommentContent}}</p> -->
                        <!-- <p  v-if="item.action === 4" class="font-span margin-bottom-16">{{item.sendCommentContent}}</p> -->
                        <p  v-if="item.action === 5" class="font-span margin-bottom-16">关注了你</p>
                        <p  v-if="item.action === 6" class="font-span margin-bottom-16">{{item.targetId}}</p>
                    </div><!--评论的内容-->

                </div><!--评论回复内容区域-->
	</div>    
      

</template>

<script>
import '../../../assets/picture/workDetailcss.css'

export default {
    name: 'noticeMail',
    props:['item','index'],


    data () {
	  return {
            /**回复评论的用户名： 回复XX (placeholder)*/
            answerCommentUser:'',
            /*绑定某个回复框*/
            commentIndex:-1,
            /*回复评论的内容*/
            answerCommentValue:'',
            page:1,
			
	  }
    },
    methods:{
        CommentCurrentPage(page){
            this.$emit('CommentCurrentPage',[{pageNum:page},{type:2}])
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