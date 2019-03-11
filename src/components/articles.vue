<template>
	<div class="article">
    <div class="wrapper">
      <swiper></swiper>
      <recommend-bar></recommend-bar>
      <sort-content></sort-content>
    </div>
	</div>
</template>

<script>
import Swiper from './home/Swiper'
import RecommendBar from './home/RecommendBar'
import SortBar from './home/SortBar'
import SortContent from './home/SortContent'

export default{
  name: 'article',
  components: {
    Swiper,
    RecommendBar,
    SortBar,
    SortContent
  },
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
	.article{
    padding: 0;
    background-color: #f5f5f5;
  }
  
  .wrapper {
    width: 1136px;
    margin: 0 auto;
    background-color: #fff;
  }
</style>