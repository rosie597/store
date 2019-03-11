<template>
	<div class="container-fluid">
        <div class="nullNews" v-if="Somecomment.length == 0">
                  <p class="nullNews-font">没有评论...</p>
        </div>
        <div v-else>
            <div class="comment-main" v-for="(item ,index ) in Somecomment" :value="index" :key="item.id">
                <add-answer-component :item = "item" :index="index" @addComment = 'addComment' @deleteCommentFun = 'deleteCommentFun'></add-answer-component>
            </div>
            <el-pagination layout="prev, pager, next" :total=totalComment :page-size='10' class="page-style"  
                @current-change='CommentCurrentPage'></el-pagination> 
        </div>
	</div>
</template>

<script>
import '../../../assets/picture/workDetailcss.css'


import AddAnswerComponent from './answerComment'
import { constants } from 'fs';
export default {
    name: 'noticeMail',
    props:['totalComment','Somecomment'],
    components:{
       'add-answer-component': AddAnswerComponent
    },

    data () {
	  return {
            page:1,
			
	  }
    },


    methods:{
         
        CommentCurrentPage(page){
            this.$emit('CommentCurrentPage',{pageNum:page,type:2})
        },
        //添加回复
        addComment(value){
            let index = value[0];
            let data = value[1];
            this.Somecomment[index].children.push(data)

        },
        //删除
        deleteCommentFun(value){
             let item = value[0];
            let index = value[1]
            this.Somecomment[item].children.splice(index,1)
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