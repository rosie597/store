<template>
  <!--关注-->
  <div class="focusBox" style="padding-top: 32px;padding-bottom: 10px;">
    <b-card-group class="focusList">
      <div v-for="item in focusList">
        <b-card style="max-width: 20rem;"
                class="focus">
          <b-img :src="item.avatar" @click="checkPeople(item.id)"
                 style="cursor: pointer"
                 rounded="circle" width="64" height="64"
                 alt="img" class="m-1 focusHeadPicture" />
          <div style="height: 50px;max-width: 160px;white-space: nowrap;">
            <p class="focusName" style="cursor: pointer" @click="checkPeople(item.id)">{{item.nickname}}</p>
            <p class="focusSlogan">{{item.personalDescription.length > 10? item.personalDescription.slice(0,10) + '...' : item.personalDescription}}</p>
          </div>
          <b-button variant="primary" class="followTrue"
                    v-if="!item.islike" @click="followThem(true, item)">
            <span>关注</span>
          </b-button>
          <b-button variant="primary" class="followFalse"
                    v-if="item.islike" @click="followThem(false, item)">
            <span>已关注</span>
          </b-button>
        </b-card>
      </div>
    </b-card-group>
    <b-pagination v-if="focusList != undefined && focusList.length!=0"
                  :total-rows="focusTotal" :per-page="20"
                  v-model="focusPageNum" @click="getFans"
                  align="center" hide-goto-end-buttons  />
  </div>
</template>

<script>
    export default {
        name: "follow",
      props:{
        userId:String,
        required: true
      },
      data(){
          return{
            focusTotal: 20,
            focusPageNum:1,
            focusList:[]
          }
      },
      methods:{
        // 关注初始化
        getFollow:function(){
          let self = this;
          this.$axios({
            method: 'get',
            baseURL: self.domainName+'/profile/follows',
            params:{
              pageNum: self.focusPageNum,
              pageSize: 20,
              userId: self.userId,
            }
          }).then((res)=>{
            self.focusTotal = res.data.data.total;
            self.focusList = res.data.data.rows;
          }).catch((err)=>{
            self.$message('获取数据失败');
          })
        },follow:function(item){
          let self = this;
          let id = item.id
          this.$axios({
            method: 'post',
            baseURL: self.domainName+'/follow',
            url: '/'+ id
          }).then((res)=>{
            item.islike = res.data.data;
          }).catch((err)=>{
            self.$message('网络错误');
          })
        },
        cancelFollow:function(item){
          let self = this;
          let id = item.id;
          this.$axios({
            method: 'delete',
            baseURL: self.domainName+'/follow',
            url: '/'+ id,
            params:{
              islike: item.islike
            }
          }).then((res)=>{
            item.islike = 0;
          }).catch((err)=>{
            self.$message('网络错误');
          })
        },getFans:function(){
          let self = this;
          this.$axios({
            method: 'get',
            baseURL: self.domainName+'/profile/fans',
            params:{
              pageNum: self.fansPageNum,
              pageSize: 20,
              userId: self.userId,
            }
          }).then((res)=>{
            self.fansTotal = res.data.data.total;
            self.fansList = res.data.data.rows;
          }).catch((err)=>{
            self.$message('获取数据失败');
          })
        },
      followThem: function (state, item) {
        if (state === true){
          this.follow(item);
          // item.islike = !item.islike;
        }else if (state === false){
          this.cancelFollow(item);
          // item.islike = !item.islike;
        }
      },
      },
      created:function () {
        this.getFollow();
      }
    }
</script>

<style scoped>
  .focusList{
    text-align: center;
    padding-bottom: 20px;
  }
  .focus{
    display: inline-block;
    width: 208px;
    height: 208px;
    margin: 0 1.1rem;
  }
  .focus .focusName{
    margin-top: 12px;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 16px;
    color: #515151;
    font-weight: bold;
  }
  .fans .fansSlogan, .focus .focusSlogan{
    font-size: 14px;
    color: #999999;
    line-height: 14px;
  }
  .followTrue, .followFalse{
    padding: 0;
    border: none;
    height: 32px;
    width: 64px;
    font-size: 14px;
    line-height: 32px;
  }
  .followFalse{
    background-color: #F6F6F6;
    color: #C1C1C1;
  }
</style>
