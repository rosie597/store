<template>
	<div class="range_choose">
		<div class="content">
			<div :class="itemClass[index]" v-for="(item,index) in cate_items" @click='cateFn(index)'>{{item}}</div>
		</div>
		<div class="content">
			<div :class="itemClass2[index]" v-for="(item,index) in sort_items" @click='sortFn(index)'>{{item}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'rangeChoose',
		data(){
			return{
				cate_items:['不限类别',' 文章 ','艺术作品',' 摄影 '],
				sort_items:['默认排序','最多收藏','最新发布','最多评论'],
				itemClass:['item_active','item','item','item'],
				itemClass2:['item_active','item','item','item'],
				sort:''
			}
		},
		methods:{
			cateFn(idx){
				this.itemClass=['item','item','item','item']
				this.itemClass[idx]='item_active'
				if(idx){
					this.$store.dispatch('typeChoose',idx)
				}else{
					this.$store.dispatch('typeChoose','')
				}
				this.searchReq('',idx)
			},
			sortFn(idx){
				var that=this
				this.itemClass2=['item','item','item','item']
				this.itemClass2[idx]='item_active'
				switch(idx){
					case 0:{
						that.sort='visits'
					}break;
					case 1:{
						that.sort='favouriteNum'
					}break;
					case 2:{
						that.sort='publishTime'
					}break;
					case 3:{
						that.sort='commentNum'
					}break;
				}
				var sort=that.sort
				this.$store.dispatch('sortChoose',sort)
				this.searchReq(sort)
			},
			//获得搜索结果
      		searchReq(sort,type){
      			var that=this
      			var key=that.$store.state.searchVal;
      			var sort=sort||that.$store.state.sortNum;
      			var type=that.$store.state.typeNum||''
        		this.$axios({
        			method:'get',
        			url:this.domainName+'/work/search?key='+key+'&pageNum=1&pageSize=20&sort='+sort+'&type='+type,
        			
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
		}
	}
</script>
<style scoped>
	*{
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		line-height: 20px;
	}
	.range_choose{
		width: 100%;
		height: 137px;
		background-color: white;
		padding-top: 32px;
	}
	.content{
		width: 1136px;
		margin:0 auto;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.item{
		padding: 17px;
		cursor:pointer;
	}
	.item_active{
		width:88px;
		height:32px;
		background:#4959F6;
		border-radius:4px;
		color: white;
		line-height: 28px;
		margin-top: 12px;
		cursor: pointer;
	}
</style>