<template>
	<div class="home">
		<div class="content">
			<el-container>
		      <el-container>
		        <el-aside width="300px">
		          <el-menu background-color="#F0F0F0"
		      text-color="#000"
		      active-text-color="#11C2EE" :default-active="this.$router.path" router >
		            <el-menu-item index="/about/rubric">关于彩罐</el-menu-item>
		            <el-menu-item index="/about/protocol">用户协议</el-menu-item>
		            <el-menu-item index="/about/tips">投稿注意事项</el-menu-item>
		            <el-menu-item index="/about/tipoff">举报有害违规信息</el-menu-item>
		          </el-menu>
		        </el-aside>
		        <el-main>
		          <div class="main">
		            <keep-alive>
		              <router-view/>
		            </keep-alive>
		          </div>
		        </el-main>
		      </el-container>
		    </el-container>
		</div>
	</div>

</template>
<script type="text/javascript">
	export default{
		name:'about',
		data(){
			return{

			}
		},
		methods:{
			
		}
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
</style>