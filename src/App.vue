<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view/>
    <div class="footer">粤ICP备17128595号-2</div>
  </div>
</template>

<script>
  import topBar from './components/topBar'
export default {
  name: 'App',
  components:{
    topBar
  },
  methods:{
  },
  created(){
    var that=this;
    var token=that.getCookie('token')
    var userData=JSON.parse(that.getCookie('userData'))
    if(token){
        let arr = token.split('.')[1];
        if (JSON.parse(atob(arr)).exp - (Date.parse(new Date()) / 1000) < 0) {
          that.$message.error('请重新登录');
          that.$store.dispatch('exit');      
        }else{
          that.$store.dispatch('login',{token,userData})
        }
    }else{
      that.$store.dispatch('exit');   
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer{
  width: 100%;
  height: 40px;
  text-align: right;
  font-size: 18px;
  margin-top: 130px;
  padding-top: 10px;
  padding-right: 10px;
  background-color: #f5f5f5;
  color:#666;
  z-index: 99;
}
</style>
