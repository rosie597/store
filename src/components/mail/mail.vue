<template>
	<div class="home">
		<div class="content">
			<div class="nav-bg"> 
				<ul class="nav">
						<li v-for="(item, index) in navSelect" :value="item.value" :key="index"  
						class="nav-item nav-border "  @click="selected(item)"  style="cursor:pointer" 
      					 :class="{active: SelectRouterName == item.path, 'font-px':SelectRouterName !== item.path }" >
							<a class="nav-link"> {{item.value}}</a>
						</li>
				</ul>
			</div>	
			<div v-loading='mailLoading'>
				<all v-if="SelectRouterName == 'allMail'" :totalElement='totalElement' :comment='comment' @currentPage='currentPage'></all>
				<Notice v-if="SelectRouterName == 'noticeMail'" :totalNotice = 'totalNotice' :Noticecomment='Noticecomment' @NoticeCurrentPage='NoticeCurrentPage'></Notice>
				<comment v-if="SelectRouterName == 'commentMail'"  :totalComment = 'totalComment' :Somecomment='Somecomment' @CommentCurrentPage='CommentCurrentPage'></comment>
			</div>
			
		</div>
	</div>
</template>

<script>
import All from './children/all.vue'
import Comment from './children/comment.vue'
import Notice from './children/notice.vue'
export default {
		name:'mail',
		components:{
			all: All,
			comment: Comment,
			Notice: Notice,
		},
		data(){
			return{
				
				page:1,
				//消息
				navSelect:[
					{
						key:'0',
						value:'全部消息',
						path:'allMail',
					},
					{
						key:'1',
						value:'公告',
						path:'noticeMail',
					},
					{
						key:'2',
						value:'评论',
						path:'commentMail'
					}
				],
				activeName:'',
				SelectRouterName:'',
				//评论的消息
				Somecomment:[],
				//评论的消息总数
				totalComment:0,
				//公告
				Noticecomment:[],
				//公告的消息总数
				totalNotice:0,
				//消息总数
				totalElement:0,
				//全部消息
				comment:[],
				//站内信的loading
				mailLoading:true
			}
		},


		methods:{
			selected: function(item) {
			  this.activeName = item.value;
			  this.SelectRouterName = item.path;
				// 	switch ( this.SelectRouterName) {
				// 	case 'allMail': this.$router.push('/mail/all') 
				// 	break
				// 	case 'noticeMail': this.$router.push('/mail/notice') 
				// 	break
				// 	case 'commentMail': this.$router.push('/mail/comment') 
				// 	break
				// }
			},
			 getmessage(value){
					this.$axios({
						method:'get',
						url:this.domainName+ '/message/get',
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						params:{...value, pageSize:10},
						
					}).then((res)=>{
					
						if(res.data.code === 20000){
							this.totalElement = res.data.data.rows.length;
							this.comment = res.data.data.rows;
							for(let key in this.comment){
								if(this.comment[key].showType == 2){
										this.$set(this.comment[key],'children',[])      
								}
							}
							this.mailLoading = false;
						}
					}).catch((error)=>{
						this.$message.error('请检查网络')
					})
				},
			currentPage(value){
				this.getmessage(value);
			},
			//传递评论
			CommentCurrentPage(value){
				this.getComment(value);
			},
			//获取评论
			getComment(value){
				this.$axios.get(this.domainName+ '/message/get',{
					params:{...value,pageSize:10}
				}).then((res)=>{
					if(res.data.code === 20000){
						this.Somecomment = res.data.data.rows;
						for(let key in this.Somecomment){
										this.$set(this.Somecomment[key],'children',[])      							
						}
						this.totalComment = res.data.data.rows.length ;
					}
				}).catch((error)=>{
					this.$message.error('请检查网络')
				})
			},
			//传递公告
			NoticeCurrentPage(value){
				this.getNotice(value);
			},
			getNotice(value){
				this.$axios.get(this.domainName+ '/message/get',{
					params:{...value,pageSize:10}
				}).then((res)=>{
					if(res.data.code === 20000){
						this.Noticecomment = res.data.data.rows
						this.totalNotice = res.data.data.rows.length ;
					}
				}).catch((error)=>{
					this.$message.error('请检查网络')
				})
			},

		},

		created(){
			this.SelectRouterName = this.$route.name;
			if(this.SelectRouterName == 'mail'){
				// this.activeName = 
				// this.$router.push('/mail/all')
				this.SelectRouterName  = 'allMail'
			}
						this.getmessage({pageNum:this.page});
						this.getNotice({pageNum:this.page,type:1})
						this.getComment({pageNum:this.page,type:2})
		},
	}
</script>

<style scoped>
.home{
      padding: 0;
      background-color: #f5f5f5;
  }
  .content{
    overflow: hidden;
    zoom: 1;
    font-size: 16px;
    width: 1136px;
    margin: 0 auto;
    background-color: #fff;
  }
	.nav-bg{
		background-color: #FFFFFF;
		margin-top: 24px;
		width: 100%;
		height: 61px;
		margin-bottom: 1px;
	}
	.nav{
		line-height: 41px;
		display: flex;
		flex-direction: row;
	}
	.nav-border{
	}
	.active{
		border-bottom: 4px solid rgba(73,89,246,1);
		font-size: 18px;
		color:rgba(81,81,81,1);
	}
	/* .active:after {
        content: '';
        position: absolute;
        
        top: auto;
      
       
        height: 4px;
        width: 32px;
        background-color: rgba(73,89,246,1);
    } */
	.font-px{
		font-size: 16px;
		color:rgba(153,153,153,1);
	}
</style>