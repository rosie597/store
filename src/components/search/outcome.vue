<template>
	<div class="outcome">
		<div class="box">
			<div class='itemCtn'>
				<card v-for='item of $store.state.outcomeList' :key='item.id' v-bind:item='item'></card>
			</div>
			<div class="pageCtn">
				<el-pagination background layout="prev, pager, next" class='pagination' @current-change='pageChange' :page-size="pagesize" @size-change="handleSizeChange" :current-page="currentPage" :total='$store.state.total'>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import card from './card'
	export default{
		name:'outcome',
		components:{
			card
		},
		props:['val'],
		data(){
			return{
				currentPage:1,
				pagesize:20,//每页显示的条数
			}
		},
		methods:{
			pageChange(page){
				this.currentPage=page
				this.searchReq(page)
			},
			handleSizeChange: function (size) {
                this.pagesize = size;//当前页面数据条目
        	},
        	//获得搜索结果
      		searchReq(page){
      			var that=this,
      			key=that.$store.state.searchVal,
				sort=that.$store.state.sortNum,//1收藏2最新3评论
				type=that.$store.state.typeNum||''//1文章2艺术作品3摄影
        		this.$axios({
        			method:'get',
        			url:this.domainName+'/work/search?key='+key+'&pageNum='+page+'&pageSize=20&sort='+sort+'&type='+type,
        		}).then((res)=>{
        			if(res.data.code==20000){
        				this.$store.dispatch('total',res.data.data.total)
				        this.$store.dispatch('search',res.data.data.rows)
        			}else{
        				this.$message.error('搜索失败');
        			}
        		}).catch((err)=>{
        			console.log(err)
        			this.$message.error('网络错误');
        		})
      		},
		},
		mounted(){
			this.list=this.$store.state.outcomeList
			this.total=this.$store.state.total
		}
	}
</script>
<style scoped>
	.outcome{
		width: 100%;
		background-color: #F6F6F6;
		display: inline-block;
	}
	.box{
		width: 1160px;
		margin: 0 auto;
	}
	.itemCtn{
		display: flex;
		flex-wrap: wrap;
		padding-top: 24px;
	}
	.itemCtn > .card {
	  margin-right: 24px;
	  margin-bottom: 24px;
	}
	.pageCtn{
		padding-top: 24px;
		padding-bottom:30px;
	}
</style>