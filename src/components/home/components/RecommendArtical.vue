<template>
  <div class="artical">
    <div class="title">
      <h3>推荐文章</h3>
      <a href="#" class="more" @click="$router.push('/articles')">
        查看更多
			  <img class="next" src="../../../../static/imgs/next.png">
      </a>
    </div>
    <div class="card-list">
      <recommend-card :data="articalList[0] || {}" v-if='articalList[0]'></recommend-card>
      <recommend-card :data="articalList[1] || {}" v-if='articalList[1]'></recommend-card>
      <recommend-card :data="articalList[2] || {}" v-if='articalList[2]'></recommend-card>
    </div>
  </div>
</template>

<script>
// import Card from './Card'
import RecommendCard from './RecommendCard'
export default {
  name: 'RecommendArtical',
  components: {
    RecommendCard
  },
  props: {
    articalList: {
      type: Array
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.artical {
  width: 226px;
  background-color: #fff;
  font-family: PingFangSC-Medium;
  padding-left: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  width: 208px;
  margin-bottom: 16px;
}

.title > h3 {
  margin-top: 22px;
  font-size: 18px;
  color: #515151;
}

.title > .more {
  display: flex;
  align-items: center;
  margin-top: 37px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #c1c1c1;
}

.title > .more:hover {
  text-decoration: none;
}

.next {
  margin-left: 8px;
}

.card-list {
  display: flex;
  justify-content: space-between;
  width: 446px;
  display: flex;
  flex-direction: column;
}
</style>


