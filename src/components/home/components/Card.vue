<template>
  <div class="card" @click="handleClick">
    <div class="img-container">
      <img :src="data.cover">
    </div>
    <div class="desc ellipsis">
      {{data.title}}
    </div>
    <div class="user">
      <img :src="data.avatar" alt="" class="avatar">
      <div class="name ellipsis">{{data.nickname}}</div>
      <div class="time ellipsis">{{time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
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
  },
  computed: {
    time () {
      let current = new Date().getTime();
      let publish = new Date(this.data.publishTime).getTime();
      let time = (current - publish)/1000/60;
      if (time >= 60*24) {
        return `${Math.floor(time/60/24)}天前`
      } if (time < 60) {
        return `${Math.floor(time)}分钟前` 
      } else {
        return `${Math.floor(time/60)}小时前`        
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 208px;
  height: 234px;
  background-color:#fff;
  box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.08);
  border-radius: 8px;
}

.card:hover {
  cursor: pointer;
}

.img-container {
  width: 100%;
  height: 148px;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
}

.img-container > img {
  height:100%;
  overflow: hidden;
}

.desc {
  width: 169px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #515151;
  margin: 16px 0;
  margin-left: 16px;
  text-align: left;
}

.user {
  display: flex;
  font-family: PingFangSC-Regular;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-left: 16px;
}

.name {
  width: 82px;
  font-size: 12px;
  font-weight: 400;
  color: #515151;
  margin-top: 6px;
  margin-left: 16px;
}
.time {
  font-size: 12px;
  color: #c1c1c1;
  margin-top: 6px;
  margin-left: 15px;
}
</style>

