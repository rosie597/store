<template>
  <div class="photo">
    <div class="title">
      <h3>{{ title }}</h3>
      <a href="#" class="more" @click="$router.push('/photo')">
        查看更多
			  <img class="next" src="../../../../static/imgs/next.png">
      </a>
    </div>
    <div class="card-list">
      <recommend-card :data="workList[0] || {}" v-if='workList[0]'></recommend-card>
      <recommend-card :data="workList[1] || {}" v-if='workList[1]'></recommend-card>
      <recommend-card :data="workList[2] || {}" v-if='workList[2]'></recommend-card>
    </div>
  </div>
</template>

<script>
// import Card from './Card'
import RecommendCard from './RecommendCard'

export default {
  name: 'RecommendWork',
  components: {
    RecommendCard
  },
  props: {
    workList: { 
      type: Array
    }
  },
  data () {
    return {
      title: '推荐摄影'
    }
  },
  mounted () {
    this.title = this.$route.path.includes('/photo') ? '推荐艺术作品' : '推荐摄影'
  }
}
</script>

<style scoped>
.photo {
  width: 226px;
  font-family: PingFangSC-Medium;
  background-color: #fff;
  padding-left: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  width: 208px;
  margin-bottom: 16px;
}

.title > h3 {
  margin-top: 32px;
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
  width: 446px;
  justify-content: space-between;
  flex-direction: column;
}
</style>


