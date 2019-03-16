<template>
  <div class="recommend-card" @click="handleClick">
    <div class="imgCtn">
      <img :src="data.cover" class="cover-img">
    </div>
    
    <div class="desc">
      <div class="title ellipsis">{{data.title}}</div>
      <span class="name ellipsis">{{data.nickname}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendCard',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
   handleClick () {
      let id = this.data.id;
      let param = {
        path: 'detail',
        name:'detail',
        query: {
          id:id
        } 
      }
      this.$router.push(param)
    }
  }
}
</script>

<style scoped>
.recommend-card{
  display: flex;
  width: 206px;
  height: 64px;
  margin: 5px 10px;
  color: #515151;
  background-color: #fff;
}

.rank-card:hover {
  cursor: pointer;
}
.imgCtn{
  width: 74px;
  height: 64px;
  overflow: hidden;
  text-align: left;
}
.cover-img {
  height: 64px;
}

.desc {
  margin-left: 16px;
  padding: 8px 0;
}

.desc .title {
  width: 84px;
  font-size: 14px;
  text-align: left;
}

.desc .user {
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  line-height: 24px;
}

.user .avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.user .name {
  width: 58px;
  font-size: 12px;
}
</style>