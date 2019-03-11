<template>
  <div class="rank-card" @click="handleClick">
    <img :src="data.cover" class="cover-img">
    <div class="desc">
      <div class="title ellipsis">{{data.title}}</div>
      <div class="user">
        <img :src="data.avatar" class="avatar">
        <span class="name ellipsis">{{data.nickname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankCard',
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
        params: {
          id
        } 
      }
      this.$router.push(param)
    }
  }
}
</script>

<style scoped>
.rank-card {
  display: flex;
  width: 170px;
  height: 64px;
  color: #515151;
  background-color: #fff;
}

.rank-card:hover {
  cursor: pointer;
}

.cover-img {
  width: 64px;
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

