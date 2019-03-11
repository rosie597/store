<template>
  <div class="recomend-bar">
    <recommend-work :workList="workList"></recommend-work>
    <recommend-artical :articalList="articalList"></recommend-artical>
    <recommend-author :authorList="authorList"></recommend-author>
  </div>
</template>

<script>
import RecommendAuthor from './components/RecommendAuthor'
import RecommendArtical from './components/RecommendArtical'
import RecommendWork from './components/RecommendWork'

import axios from 'axios'

export default {
  name: 'RecommendBar',
  components: {
    RecommendAuthor,
    RecommendArtical,
    RecommendWork
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
            this.authorList = res.data.data || []
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
  display: flex;
}
</style>
