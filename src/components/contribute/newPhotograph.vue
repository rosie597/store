<template>
  <div class="home">
    <b-container class="content">
      <div class="header">
        <h2>发布摄影</h2>
      </div>
      <div class="main">
        <div class="part1">
          <b-row class="row">
            <b-col cols="12">
              <i class="point">·</i>
              <p class="title">作品标题</p>
              <b-form-input maxlength="40" class="input" v-model="workData.title" type="text" placeholder="请输入标题"/>
              <span v-if="isTitle" class="alert">请输入标题</span>
            </b-col>
          </b-row>
          <b-row class="row">
            <b-col cols="12">
              <div style="float: left;">
                <i class="point" style="visibility: hidden;">·</i>
                <p class="title">作品简介</p>
              </div>
              <div style="float: left;margin-left: 4.5px;">
                <b-form-textarea rows="4" max-rows="4" maxlength="200" no-resize
                                 class="input" v-model="workData.description"
                                 type="text" placeholder="默认选取文章正文前30字"/>
              </div>
            </b-col>
          </b-row>
          <!--<b-row class="row">-->
          <!--<b-col cols="12">-->
          <!--<i class="point" style="visibility: hidden;">·</i>-->
          <!--<p class="title">作品类型</p>-->
          <!--<b-form-select style="width: 216px;" class="input select"-->
          <!--v-model="workData.type" :options="workCategory" />-->
          <!--<span v-if="isCategory" class="alert">请选择分类</span>-->
          <!--</b-col>-->
          <!--</b-row>-->
        </div>
        <div class="part2">
          <b-row>
            <b-col cols="12">
              <i class="point">·</i>
              <p class="title">上传图片</p>
              <span class="tips">（最多可上传20张哦 (支持格式 jpg、png，宽高尺寸须大于420像素)</span>
              <span v-if="isImg" class="alert">请上传封面</span>
            </b-col>
          </b-row>
          <div class="imgInputerBox">
            <ImgInputer auto-upload v-model="workData.cover" :on-error="imgError"
                        :action="imgUrl" :on-success="coverSuccess"
                        accept="image/*" placeholder="封面"
                        bottom-text="封面" class="imgInputer"></ImgInputer>
            <div class="imgInputerWrapper" v-for="item in workData.content">
              <ImgInputer auto-upload v-model="item.url" :on-error="imgError"
                          :action="imgUrl" :on-success="imgSuccess"
                          accept="image/*" placeholder="作品"
                          bottom-text="作品" class="imgInputer"></ImgInputer>
              <span class="deleteWork" @click="deleteWork(item.key)" v-show="workData.content.length > 1 && item.url">×</span>
            </div>
          </div>
        </div>
        <div class="part3">
          <b-row class="row">
            <b-col cols="12">
              <i class="point" style="visibility: hidden;">·</i>
              <p class="title">添加标签</p>
              <b-form-input @keyup.enter="addTag" maxlength="10" style="width: 280px;" class="input" v-model="currentTag" type="text" placeholder="请输入标签，回车键添加"/>
              <span>{{workData.tag.length}}/5</span>
            </b-col>
          </b-row>
          <b-row class="row">
            <b-col cols="12">
              <i class="point" style="visibility: hidden;">·</i>
              <p class="title" style="visibility: hidden; margin-right: 32px;">正文编辑</p>
              <div class="tagBox" v-for="(item, index) in workData.tag">
                {{item}}
                <span @click="deleteTag(index)">×</span>
              </div>
            </b-col>
          </b-row>

        </div>
        <div class="part4">
          <b-row class="footer">
            <b-col cols="12">
              <b-button style="width: 88px;" @click="back" variant="outline-secondary" class="button">取消</b-button>
              <b-button style="width: 200px;" @click="post" variant="primary" class="button">提交发布</b-button>
              <router-link target="_blank" :to="{path:'/about/tips'}">投稿注意事项</router-link>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>

    <b-modal ref="imgError" hide-footer hide-header>图片上传失败</b-modal>
    <b-modal ref="postError" hide-footer hide-header>发布失败</b-modal>
    <b-modal ref="postSuccess" hide-footer hide-header>发布成功</b-modal>
  </div>
</template>

<script>
  import ImgInputer from 'vue-img-inputer'
  import 'vue-img-inputer/dist/index.css'

    export default {
      name: "newPhotograph",
      components:{
        'ImgInputer':ImgInputer,
      },
      data:function () {
        return{
          isImg: false, isTitle: false,
          // workCategory:[
          //   { value: null, text: '选择作品类型' },
          //   { value: 1, text: '文章' },
          //   { value: 2, text: '艺术作品' },
          // ],
          currentTag:"",
          tagNumber:1,
          imgUrl:"http://www.colourcan.net/api/qiniu/upload",
          workData:{
            cover:"1",
            title: "",
            description:"",
            type:'3',
            content:[
              {url: "", key:0}
            ],
            tag:["原创","摄影"]
          }
        }
      },
      methods:{
        back:function(){
          this.$router.go(-1);
        },
        coverSuccess:function(res, file){
          this.workData.cover = res.data;
        },
        imgSuccess:function(res, file){

          let content = this.workData.content;
          let length = content.length;
          content[length - 1].url = res.data;
          if (length >= 4){
            return false;
          }
          let key = content[length - 1].key + 1;
          this.workData.content.push({url: "", key: key});
        },
        imgError:function(res,file){
          this.$refs.imgError.show();
        },
        // 删除作品
        deleteWork:function(key){
          let content = this.workData.content;
          for (let i=0; i<content.length; i++){
            if (content[i].key == key){
              let length = content.length;
              if (length >= 4 && content[length - 1].url != ""){
                let key = content[length - 1].key + 1;
                this.workData.content.push({url: "", key: key});
              }
              this.workData.content.splice(i,1);
              break;
            }
          }
        },
        addTag:function () {
          let key,length;
          length = this.workData.tag.length-1;
          if (this.currentTag == "" || length >=4 ){
            return;
          }
          let value = this.currentTag;
          this.workData.tag.push(value);
          this.currentTag="";
          // this.tagNumber++;
        },
        deleteTag:function (index) {
          let tag = this.workData.tag;
          this.workData.tag.splice(index,1);
        },
        // 判断表单是否有空值
        isNull:function () {
          let workData = this.workData;
          this.isImg = workData.cover == "" ? true : false;
          // this.isCategory = workData.type == null ? true : false;
          this.isTitle = workData.title == "" ? true : false;
        },
        // 发布
        post:function () {
          this.isNull();
          let workData = this.workData;
          let data = {};
          let that = this;
          if (this.isImg || this.isTitle){
            // if (this.isImg || this.isCategory || this.isContent){
            return false;
          }else {
            let tag = '';
            let content = '';
            data.cover = workData.cover;
            data.title = workData.title;
            data.description = workData.description;
            data.type = workData.type;
            content = workData.content.map(function (val) {
              return val.url;
            }).join(",").slice(0,-1);
            tag = workData.tag.map(function (val) {
              return val;
            }).join(",");
            data.content = content;
            data.tag = tag;
          }
          this.$axios({
            method: 'post',
            baseURL: this.domainName+'/work',
            headers:{
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
          }).then((res) =>{
            that.$refs.postSuccess.show();
            setTimeout(function () {
              that.$router.push({path: '/personalHome'});
            }, 1500);
          }).catch((error) =>{
            this.$refs.postError.show();
          });
        }
      }
    }
</script>

<style scoped>
  .home{
    padding: 10px 0;
    background-color: #f5f5f5;
    overflow: hidden;
    margin-top: 56px;
  }
  a{
    cursor: pointer;
  }
  .content{
    overflow: hidden;
    zoom: 1;
    font-size: 16px;
    max-width: 1136px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
  }
  .header{
    margin-top: 32px;
    margin-bottom: 30px;
    padding-bottom: 24px;
    border-bottom: 1px solid #eee;
  }
  .header h2{
    font-size: 24px;
    text-align: left;
  }
  .main{
    margin-top: 0;
    padding-bottom: 50px;
  }
  .row{
    margin-bottom: 15px;
    text-align: left;
  }
  .alert{
    padding-left: 15px;
    font-size: 13px;
    color: #FF6E6E;
    border: none;
    font-weight: bold;
  }
  .point{
    line-height: 14px;
    font-weight: bold;
    font-size: 20px;
    color: #FF6E6E;
  }
  .title{
    display: inline-block;
    font-size: 14px;
    color: #515151;
    font-weight: bold;
  }
  .tips{
    font-size: 12px;
    color:#999999;
  }
  .imgInputerBox{
    position: relative;
    padding-left: 16px;
    width: 100%;
    height: 180px;
    background: #F6F6F6;
    border-radius: 10px;
    text-align: left;
  }
  .imgInputerWrapper{
    position: relative;
    display: inline-block;
  }
  .imgInputer{
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 40px;
    width: 144px;
    height: 102px;
  }
  .deleteWork{
    cursor: pointer;
    visibility: hidden;
    position: absolute;
    right: 22px;
    top: 45px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: #555;
    opacity: 0.7;
    color: #fff;
    font-size: 24px;
    text-align: center;
    line-height: 25px;
    z-index: 999;
  }
  .imgInputerWrapper:hover .deleteWork{
    visibility: visible;
  }
  .deleteWork:hover{
    background: #000;
  }
  .part1{
    margin-bottom: 40px;
  }
  .input{
    margin-left: 32px;
    width: 800px;
    display: inline-block;
    background: #F6F6F6;
  }
  .part2{
    margin-bottom: 27px;
  }
  .part3{
    margin-bottom: 32px;
    padding-bottom:15px;
  }
  .tagBox{
    color: #515151;
    font-weight: bold;
    padding-left: 12px;
    padding-right: 8px;
    margin-right: 20px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background: #F6F6F6;
    border-radius: 4px;
    font-size: 14px;
  }
  .tagBox span{
    display: inline-block;
    position: relative;
    top: 2px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    line-height: 25px;
  }
  .tagBox span:hover{
    color: #888;
  }
  .part4{
    text-align: center;
  }
  .button{
    margin-left: 40px;
    font-weight: 400;
    font-size: 16px;
  }
  .footer{
    text-align: center;
    background: inherit;
  }
</style>
