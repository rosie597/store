<template>
	<div class="content">
		<rangeChoose></rangeChoose>
		<outcome></outcome>
	</div>
</template>

<script>
	import outcome from './search/outcome'
	import rangeChoose from './search/rangeChoose'
	export default{
		name:'search',
		components:{
			outcome,
			rangeChoose
		},
		data(){
			return{
			}
		},
		created(){
			this.$store.state.sortNum='visits'
			this.$store.state.typeNum=''
		},
		beforeDistroy(){
			
		},
		methods:{
		}
	}
</script>

<style scoped>
	
</style>