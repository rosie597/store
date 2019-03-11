<template>
  <div class="author">
    <div class="title1">
      <h3>推荐作者</h3>
    </div>
    <ul class="user-list">
      <li class="user-item" v-for="item of authorList" :key="item.id" @click="handleToUserDetail(item.id)">
        <img :src="item.avatar" class="avatar">
        <div class="name ellipsis">{{item.nickname}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecommendAuthor',
  props: {
    authorList: {
      type: Array
    }
  },
  methods: {
    handleToUserDetail (id) {
      let param = {
        path: '/personalHome',
        name:'personalHome',
        params: {
          'id':id
        } 
      }
      this.$router.push(param)
    }
  }
}
</script>


<style scoped>
.author {
  margin-left: 22px;
  font-family: PingFangSC-Medium;
  color: #515151;
}

.title1 {
  text-align: left;
  margin-bottom: 40px;
}

.title1 > h3 {
  margin-top: 32px;
  font-size: 18px;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
}

.user-item {
  width: 60px;
  margin: 0 4px;
  margin-bottom: 30px;
}

.user-item:hover {
  cursor: pointer;
  color: #4959F6;
}

.user-item > img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.user-item > .name {
  width: 100%;
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

</style>
