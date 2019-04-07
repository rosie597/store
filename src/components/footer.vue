<template>
	<div class="footer">
			<a @click="$router.replace('/about/rubric')">关于彩罐</a>
			<a @click="$router.replace('/about/protocol')">用户协议</a>
			<a @click="$router.replace('/about/tipoff')">举报有害违规信息</a>
			<a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=cL_Xt_mFyOFigT7XxspBfqaxG33JEnsneVOdwE2zXh0nPquEOuHt!-2108032504" target='_Blank' rel="nofollow noreferrer">粤ICP备17128595号-2</a>
		<img src="../../static/imgs/qrCode.jpg" class="img">
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'Footer',
		data(){
			return{

			}
		},
		methods:{

		},
		mounted(){
		}
	}
</script>
<style scoped>
	a{
		text-decoration: none;
		color: white;
	}
	.footer{
		width: 100%;
		height: 100px;
		background-color: #6162F6;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding-left: 200px;
		padding-right: 200px;
	}
	.img{
		width:80px;
		height:80px;
	}
	a{
		cursor:pointer;
	}
</style>