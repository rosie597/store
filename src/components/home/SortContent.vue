<template>
  <div>
    <sort-bar :current='index' @change-sort='handleChangeCurrent'></sort-bar>
    <div class="sort-content">
      <div class="content-list">
        <card v-for="item of list" :key="item.id" :data="item"></card>
      </div>     
      <aside-rank v-if='isRankShow' @listenData='isShow'></aside-rank>
    </div>
    <div class="load">
      <div class="load-btn" @click='handleLoadMore' v-if="!isListEnd">查看更多</div>
      <div class="load-end" v-if="isListEnd">没有更多了</div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card'
import AsideRank from './components/AsideRank'
import SortBar from './SortBar'
import axios from 'axios'

export default {
  name: 'SortContent',
  components: {
    Card,
    SortBar,
    AsideRank
  },
  props: {
    
  },
  data () {
    return {
      list: [],
      index: 1,
      page: 1,
      pageSize: 32,
      isListEnd: false,
      isRankShow:false
    }
  },
  methods: {
    isShow(data){
      if(!data||data.length==0){
        this.isRankShow=false
      }else{
        this.isRankShow=true
      }
    },
    handleChangeCurrent (index) {
      this.list = [];
      this.isListEnd = false;
      this.page = 1;

      this.index = index;
      this.getContentList(index)
    },

    getContentList (index) {
      let sort = '';
      let type = 2;
      const _this = this;

      if (index === 1) {
        sort = 'recommend'
      } else if (index === 2) {
        sort = 'lastest'
      } else {
        sort = 'hotest'
      }
      if (this.$route.path.endsWith('/')) {
        type = 2
      } else if (this.$route.path.includes('/photo')) {
        type = 3
      } else {
        type = 1
      }
      axios.get(this.domainName+`/work/${sort}/${type}`, {
        params: {
          pageNum: _this.page,
          pageSize: _this.pageSize
        }
      }).then((res) => {
        if(res.status === 200 && res.data.data) {
          this.list = this.list.concat(res.data.data.rows)
        }
        if(!res.data.data.rows.length) {
          this.isListEnd = true
        }
      })
    },

    handleLoadMore () {
      if(this.isListEnd) {
        return 
      }
      this.page++;
      this.getContentList(this.index)
    }
  },

  mounted () {
    this.getContentList(this.index)
  }
}
</script>

<style scoped>
.sort-content {
  display: flex;
  background-color: #F6F6F6;
  padding-top: 24px;
  justify-content: space-between;
}

.sort-content::after {
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  margin-top: -24px;
  background-color: #f6f6f6;
  height: 100%;
  z-index: -1;
}

.content-list {
  display: flex;
  flex-wrap: wrap;
}


.content-list > .card {
  margin-right: 19px;
  margin-bottom: 24px;
}

.load {
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 40px;
  padding-bottom: 56px;
  background-color: #f6f6f6;
}

.load .load-btn {
  width: 200px;
  height: 40px;
  background-color: rgb(72, 90, 250);
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
}

.load .load-btn:hover {
  background-color: #5462e5;
}

.load-end {
  color: #555;
}
</style>
