<template>
  <div class="home">
    <b-container class="content">
      <div class="header">
        <h2>发布文章</h2>
      </div>
      <div class="main">
        <div class="part1">
          <b-row>
            <b-col cols="12">
              <i class="point">·</i>
              <p class="title">上传封面</p>
              <span class="tips">（最多可上传20张哦 (支持格式 jpg、png，宽高尺寸须大于420像素)</span>
            </b-col>
          </b-row>
          <div class="imgInputerBox">
            <ImgInputer auto-upload v-model="workData.cover" :on-error="imgError"
                        :action="imgUrl" :on-success="imgSuccess"
                        accept="image/jpg,image/png;" placeholder="封面"
                        bottom-text="封面" class="imgInputer"></ImgInputer>
            <span v-if="isImg" class="alert alert-special">请上传封面</span>
          </div>
        </div>
        <div class="part2">
          <b-row class="row">
            <b-col cols="12">
              <i class="point">·</i>
              <p class="title">作品标题</p>
              <b-form-input maxlength="40" class="input" v-model="workData.title" type="text" placeholder="请输入标题"/>
              <span v-if="isTitle" class="alert">请上传标题</span>
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
        <div class="part3">
          <b-row class="row">
            <b-col cols="12">
              <i class="point">·</i>
              <p class="title">正文编辑</p>
              <span v-if="isContent" class="alert">请编辑正文</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="editor">
              <vue-html5-editor :content="workData.content" :height="400" @change="updateData"></vue-html5-editor>
            </b-col>
          </b-row>
        </div>
        <div class="part4">
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
              <div class="tagBox" v-for="item in workData.tag">
                {{item.value}}
                <span @click="deleteTag(item.key)">×</span>
              </div>
            </b-col>
          </b-row>

        </div>
        <div class="part5">
          <b-row class="footer">
            <b-col cols="12">
              <b-button style="width: 88px;" @click="back" variant="outline-secondary" class="button">取消</b-button>
              <b-button style="width: 200px;" @click="preview" variant="outline-primary" class="button">预览文章</b-button>
              <b-button style="width: 200px;" @click="post" variant="primary" class="button">提交发布</b-button>
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
  import qs from 'qs'

    export default {
        name: "newArticle",
      components:{
        'ImgInputer':ImgInputer,
      },
      data:function () {
        return{
          isImg: false, isContent: false,isTitle:false,
          // workCategory:[
          //   { value: null, text: '选择作品类型' },
          //   { value: 1, text: '文章' },
          //   { value: 2, text: '艺术作品' },
          // ],
          currentTag:"",
          tagNumber:1,
          imgUrl:"http://www.colourcan.net/api/qiniu/upload",
          workData:{
            userId:"",
            cover:"",
            title: "",
            description:"",
            type:"1",
            content:"",
            tag:[
              {value:"原创",key:1},
              {value:"文章",key:2}
            ]
          }
        }
      },
      methods:{
        imgError:function(res,file){
          this.$refs.imgError.show();
        },
        imgSuccess:function(res, file){
          this.workData.cover = res.data;
        },
        addTag:function () {
          let key,length;
          length = this.workData.tag.length-1;
          if (this.currentTag == "" || length >=4 ){
            return;
          }
          length < 0 ? key = 1 : key =  this.workData.tag[length].key+1;
          let value = this.currentTag;
          let newTag = {value : value, key:key};
          this.workData.tag.push(newTag);
          this.currentTag="";
          // this.tagNumber++;
        },
        deleteTag:function (key) {
          let tag = this.workData.tag;
          for (let i=0; i<tag.length; i++){
            if (tag[i].key == key){
              this.workData.tag.splice(i,1);
              // this.tagNumber--;
              break;
            }
          }
        },
        back:function(){
          this.$router.go(-1);
        },
        // 判断表单是否有空值
        isNull:function () {
          let workData = this.workData;
          this.isImg = workData.cover == "" ? true : false;
          // this.isCategory = workData.type == null ? true : false;
          this.isContent = workData.content == "" ? true : false;
          this.isTitle = workData.title == "" ? true : false;
        },
        //预览
        preview:function () {
          this.isNull();
          // if (this.isImg || this.isCategory || this.isContent){
          if (this.isImg || this.isContent || this.isTitle){
            return false;
          } else{
            let data = this.workData;
            this.$router.push({name: 'preview', params:{workData: data}});
          }
        },
        // 发布
        post:function () {
          this.isNull();
          let workData = this.workData;
          let self = this;
          let data = {};
          if (this.isImg || this.isTitle){
            // if (this.isImg || this.isCategory || this.isContent){
            return false;
          }else {
            let tag = '';
            // data.userId = workData.userId;
            data.cover = workData.cover;
            data.title = workData.title;
            data.description = workData.description;
            data.type = workData.type;
            data.content = workData.content;
            workData.tag.forEach(function (ele, index, array) {
              tag += (array.length-1 != index) ? ele.value + ',' : ele.value;
            });
            data.tag = tag;
          }
          this.$axios({
            method: 'post',
            baseURL: this.domainName+'/work',
            headers:{
              'Content-Type': 'application/json;charset=utf-8',
            },
            data: JSON.stringify(data)
          }).then((res) =>{
            self.$refs.postSuccess.show();
            setTimeout(function () {
              self.$router.push({path: '/personalHome'});
            }, 1500);
          }).catch((error) =>{
            this.$refs.postError.show();
          });
        },
        // 富文本编辑器更新
        updateData:function (data) {
          this.workData.content = data;
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
  .content{
    overflow: hidden;
    zoom: 1;
    font-size: 16px;
    max-width: 1136px;
    margin: 0 auto;
    background-color: #fff;
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
  .alert-special{
    position: absolute;
    width: 70px;
    padding: 0;
    top: 95px;
    left: 220px;
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
    width: 175px;
    height: 180px;
    background: #F6F6F6;
    border-radius: 10px;
    text-align: left;
  }
  .imgInputer{
    margin-top: 40px;
    width: 144px;
    height: 102px;
  }
  .part1{
    margin-bottom: 31px;
    padding-bottom: 32px;
    border-bottom: 1px solid #eee;
  }
  .input{
    margin-left: 32px;
    width: 800px;
    display: inline-block;
    background: #F6F6F6;
  }
  .part2{
    margin-bottom: 31px;
    border-bottom: 1px solid #eee;
    padding-bottom:15px;
  }
  .part3{
    margin-bottom: 32px;
    border-bottom: 1px solid #eee;
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
  .part5{
    text-align: center;
  }
  .button{
    margin-left: 40px;
    font-weight: 400;
    font-size: 16px;
  }
  .footer{
    text-align: center;
  }
  i{
    font-style: italic;
  }
</style>
