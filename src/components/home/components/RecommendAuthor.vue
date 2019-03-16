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
  data(){
    return{
      list:[]
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
  },
  mounted(){
  }
}
</script>


<style scoped>
.author {
  width: 226px;
  font-family: PingFangSC-Medium;
  color: #515151;
  background-color: #fff;
  padding-left: 10px;
}

.title1 {
  text-align: left;
  margin-bottom: 20px;
}

.title1 > h3 {
  margin-top: 22px;
  font-size: 18px;
  padding-left: 10px;
}

.user-list {
  display: flex;
  display: flex;
  flex-direction: column;
}

.user-item {
  display: flex;
  flex-direction: row;
  margin: 0 4px;
  margin-bottom: 15px;
}

.user-item:hover {
  cursor: pointer;
  color: #4959F6;
}

.user-item > img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-item > .name {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

</style>
