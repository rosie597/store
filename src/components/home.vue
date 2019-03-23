<template>
  <div class="home">
    <div class="wrapper">
      <swiper></swiper>
      <recommend-bar></recommend-bar>
      <sort-content></sort-content>
    </div>
  </div> 
</template>

<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" charset="utf-8" data-callback="true" ></script>
<script>
import Swiper from './home/Swiper'
import RecommendBar from './home/RecommendBar'
import SortContent from './home/SortContent'
import axios from 'axios'

export default{
  name:'home',
  components: {
    Swiper,
    RecommendBar,
    SortContent
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    this.$axios.get('/api/visitor')
  }
}
</script>

<style scoped>
  .home{
    padding: 0;
    background-color: #f5f5f5;
  }
  
  .wrapper {
    width: 1136px;
    margin: 0 auto;
    background-color: #fff;
  }
</style>