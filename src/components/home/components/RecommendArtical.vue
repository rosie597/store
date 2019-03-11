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
      <card :data="articalList[0] || {}"></card>
      <card :data="articalList[1] || {}"></card>
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'RecommendArtical',
  components: {
    Card
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
  width: 446px;
  margin-left: 18px;
  background-color: #fff;
  font-family: PingFangSC-Medium;
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
  justify-content: space-between;
  width: 446px;
}
</style>


