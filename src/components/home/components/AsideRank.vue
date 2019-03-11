<template>
  <div class="rank-container">
    <div class="rank">
      <div class="header">
        <h3 class="title">排行版</h3>
        <div class="switch-btn">
          <div :class="rank===1?'active btn':'btn'" @click="handleChangeRank(1)">周榜</div>
          <div :class="rank===2?'active btn':'btn'" @click="handleChangeRank(2)">月榜</div>
        </div>
      </div>
      <div class="rank-list">
        <rank-card v-for="item of rankList" :key="item.id" :data="item"></rank-card>
      </div>
    </div>
  </div>
</template>

<script>
import RankCard from './RankCard'
import axios from 'axios'

export default {
  name: 'AsideRank',
  components: {
    RankCard
  },
  props: {

  },
  data () {
    return {
      rank: 1,
      rankList: [{}]
    }
  },
  methods: {
    handleChangeRank (rank) {
      this.rank = rank;
      if (rank === 1) {
        this.getRankList('week')      
      } else {
        this.getRankList('month')
      }
    },
    getRankList (arg) {
      axios.get(this.domainName+'/rankList/'+arg) 
        .then(this.handleGetRankListSucc)
    },
    handleGetRankListSucc (res) {
      if (res.data.code === 20000) {
        this.rankList = res.data.data;
        this.$emit('listenData',res.data.data)
      }
    }
  },
  mounted () {
    this.getRankList('week')
  }
}
</script>

<style scoped>
.rank-container {
  width: 228px;
  color: #515151;
}

.rank {
  width: 100%;
  padding: 0 16px;
  padding-bottom: 17px;
  background-color: #fff;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header .title {
  font-size: 16px;
  margin-top: 22px;
}

.switch-btn {
  display: flex;
  margin-top: 16px;
}

.switch-btn .btn {
  width: 48px;
  height: 24px;
  border-radius: 4px 0px 0px 4px;
  font-size: 12px;
  color: #c1c1c1;
  background-color: #f6f6f6;
  border: none;
  line-height: 24px;
  padding: 0;
}

.switch-btn .btn + .btn {
  border-radius: 0 4px 4px 0;
}

.switch-btn div.active {
  color: #fff;
  background-color: #4959F6;
}

.rank-list {
  margin-top: 24px;
}

.rank-list > .rank-card + .rank-card {
  margin-top: 16px;
}


</style>

