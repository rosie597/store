<template>
	<div class="container-fluid">
        <div class="nullNews" v-if="Noticecomment.length == 0">
                  <p class="nullNews-font">没有公告...</p>
        </div>
        <div v-else>
		 <div class="comment-main" v-for="(item ,index ) in Noticecomment" :value="item.value" :key="index">
                    
                    <new-notice :item="item" :index="index"></new-notice>
                </div><!--评论的用户头像和评论回复区域-->
           <el-pagination layout="prev, pager, next" :total=totalNotice :page-size='10' class="page-style"  
            @current-change='NoticeCurrentPage'></el-pagination>
        </div>
	</div>
</template>

<script>
import '../../../assets/picture/workDetailcss.css'
import newNotice from './newNotice.vue'
export default {
    name: 'commentMail',
    props:['totalNotice','Noticecomment'],
    components:{
        'new-notice':newNotice
    },
  
    data () {
	  return {
	  }
    },
    methods:{
        NoticeCurrentPage(page){
            //  this.page = page;
            this.$emit('NoticeCurrentPage',{pageNum:page,type:1})
        }
    }
}
	
</script>

<style scoped>

/*该页面另写的*/
/*公告的图标*/
.notice-icon{
    border-radius: 50%;    
    width:48px;
    height:48px;
    background:rgba(73,89,246,1);   
    display: inline-block;         
    vertical-align: top;
}
.notice-icon-font{
   display: block;         
   text-align: center;
    font-size:24px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:48px;
}
.comment-head{
    float: left;
}
</style>