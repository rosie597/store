<template>
  <div class="recomend-bar">
    <recommend-author :authorList="authorList"></recommend-author>
    <recommend-work :workList="workList"></recommend-work>
    <recommend-artical :articalList="articalList"></recommend-artical>  
    <aside-rank></aside-rank>
  </div>
</template>

<script>
import RecommendAuthor from './components/RecommendAuthor'
import RecommendArtical from './components/RecommendArtical'
import RecommendWork from './components/RecommendWork'
import AsideRank from './components/AsideRank'

import axios from 'axios'

export default {
  name: 'RecommendBar',
  components: {
    RecommendAuthor,
    RecommendArtical,
    RecommendWork,
    AsideRank
  },
  data () {
    return {
      workList: [],
      authorList: [],
      articalList: []
    }
  },
  methods: {
    getWorkList (type) {
      axios.get(this.domainName+`/work/recommend/${type}`)
        .then((res) => {
          if(res.status === 200 && res.data.data) {
            this.workList = res.data.data.rows || []
            console.log(this.workList)
          }
        })
    },
    getArticalList () {
      axios.get(this.domainName+'/work/recommend/1')
        .then((res) => {
          if(res.status === 200 && res.data.data) {
            this.articalList = res.data.data.rows || []
          }
        })
    },
    getAuthorList () {
      axios.get(this.domainName+'/user/recommend')
        .then((res) => {
          if(res.status === 200 && res.data.data) {
            this.authorList = res.data.data.splice(0,3) || []
          }
        }) 
    }
  },

  mounted () {
    const type = this.$route.path.includes('/photo') ? '2' : '3';
    this.getWorkList(type);
    this.getArticalList();
    this.getAuthorList()
  }
}
</script>

<style scoped>
.recomend-bar {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  margin-top:40px;
}
</style>
