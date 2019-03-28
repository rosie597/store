<template>
  <div class="home">
    <div class="wrapper">
        <swiper></swiper>
        <div class="content">
          <sort-content></sort-content>
          <recommend-bar></recommend-bar>
        </div> 
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
  .content{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
</style>