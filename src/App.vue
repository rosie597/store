<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view/>
    <div class="footer1">粤ICP备17128595号-2</div>
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
.footer1{
  width: 100%;
  height:36px;
  position: fixed;
  bottom: 0;
  box-shadow:0px 12px 16px 8px rgba(0,0,0,0.42);
  text-align: right;
  line-height: 46px;
  font-size: 14px;
  margin-top: 130px;
  padding-right: 15px;
  background-color: #fff;
  color:#666;
  z-index: 999;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>
