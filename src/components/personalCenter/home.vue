<template>
  <div class="home">
    <div class="content">
        <div class="information">
          <div class="userPicture">
            <img :src="baseInfo.avatar" alt="用户头像">
          </div>
          <span>{{baseInfo.nickname}}</span>
          <p>{{baseInfo.personalDescription}}</p>
        </div>
        <el-row class="atten">
          <el-col :span="4" :offset="6">
            <span>{{baseInfo.popularity}}</span>
            <p>人气</p>
          </el-col>
          <el-col :span="4">
              <span>{{baseInfo.fansCount}}</span>
              <p>粉丝</p>
          </el-col>
          <el-col :span="4">
              <span>{{baseInfo.followCount}}</span>
              <p>关注</p>
          </el-col>
        </el-row>
        <div class="tabBox">
          <el-row class="tab-top">
           <el-col :span="2" :offset="7" class="tab-tag active"><p><a href="javascript:;" @click="changeTab(0)">发布记录</a></p><span></span></el-col>
           <el-col :span="2" class="tab-tag"><p><a href="javascript:;" @click="changeTab(1)">收藏夹</a></p><span></span></el-col>
           <el-col :span="2" class="tab-tag"><p><a href="javascript:;" @click="changeTab(2)">资料</a></p><span></span></el-col>
           <el-col :span="2" class="tab-tag"><p><a href="javascript:;" @click="changeTab(3)">粉丝</a></p><span></span></el-col>
           <el-col :span="2" class="tab-tag"><p><a href="javascript:;" @click="changeTab(4)">关注</a></p><span></span></el-col>
          </el-row>
          <div class="tab-content" style="background: #f6f6f6;padding-bottom: 10px;padding-top: 10px;">
            <!--发布记录-->
            <div class="tab-show contributeBox active" style="height: 976px;position: relative;">
              <calendar :visitorFlag = "visitorFlag" :userId="userId"></calendar>
            </div>
            <!--收藏夹-->
            <div class="tab-show favoriteBox">
              <!--类别选择-->
              <ul class="nav nav-pills mb-4 category" role="tablist">
                <li class="nav-item">
                  <a @click="setRecordType('')" class="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-el-selected="true">不限类别</a>
                </li>
                <li class="nav-item">
                  <a @click="setRecordType(2)" class="nav-link" id="pills-work-tab" data-toggle="pill" href="#pills-work" role="tab" aria-controls="pills-work" aria-el-selected="false">艺术作品</a>
                </li>
                <li class="nav-item">
                  <a @click="setRecordType(3)" class="nav-link" id="pills-photogra-tab" data-toggle="pill" href="#pills-photogra" role="tab" aria-controls="pills-photogra" aria-el-selected="false">摄影</a>
                </li>
                <li class="nav-item">
                  <a @click="setRecordType(1)" class="nav-link" id="pills-article-tab" data-toggle="pill" href="#pills-article" role="tab" aria-controls="pills-article" aria-el-selected="false">文章</a>
                </li>
              </ul>
              <!--作品列表-->
              <b-card-group deck class="workList" style="margin: 0 auto;">
                <div v-for="(item,index) in workList" style="width: 208px;margin: 0 10px;display: inline-block;">
                  <b-card img-top class="work">
                    <a  v-if="!visitorFlag" href="javascript:;" class="deleteButton" @click="deleteFavorite(item.id,index)">×</a>
                    <b-card-img @click="checkWork(item.id)" :src="item.cover" class="authorPicture"></b-card-img>
                    <div class="author">
                      <p  @click="checkWork(item.id)">{{item.title}}</p>
                      <img @click="checkUser(item.userId)" :src="item.avatar" :alt="item.nickname">
                      <strong @click="checkUser(item.userId)">{{item.nickname}}</strong>
                      <span>{{item.postTime}}</span>
                    </div>
                  </b-card>
                </div>
              </b-card-group>
              <b-pagination :total-rows="recordTotal" :per-page="20"
                            v-if="workList != undefined && workList.length !=0"
                                v-model="recordPage" @change="recordData"
                                align="center" hide-goto-end-buttons  />

            </div>
            <!--资料-->
            <div class="tab-show materialBox" v-if="!visitorFlag">
              <!--v-if="materialData.id == viewData.id"-->
              <div class="material">
                <el-form :model="materialData"  label-width="100px">
                  <el-form-item
                                label-align="right"
                                label="头像" class="program">
                    <div style="text-align: left;">
                      <b-img :src="materialData.avatar" class="headpicture"/>
                      <!--<input @change="uploadHeadPic" ref="upload" type="file" accept="image/*"-->
                             <!--capture="camera" name="file" class="headpictureUpload"-->
                             <!--value="修改"/>-->
                      <b-button variant="outline-danger" class="fakeUploadHeadPic" @click="fakeUploadHeadPic">修改</b-button>
                    </div>
                  </el-form-item>

                  <el-form-item label="昵称" class="program">
                    <el-input v-model="materialData.nickname" placeholder="不超过8个汉字" class="input"></el-input>
                  </el-form-item>

                  <el-form-item label="手机号" class="program">
                    <el-input v-model.number="materialData.mobile" class="input"></el-input>
                  </el-form-item>

                  <el-form-item label="性别" class="program">
                    <el-radio-group v-model="materialData.sex" style="margin-left: 12px;">
                      <template v-for="item in options">
                        <el-radio :label="item.value">{{item.text}}</el-radio>
                      </template>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="个性签名" class="program">
                    <el-input v-model="materialData.personalDescription" style="width: 70%;margin-left: 12px;"></el-input>
                  </el-form-item>

                  <el-form-item label="地区" class="program">
                    <select class="country-el-select" v-model="materialData.country" style="position:relative; bottom: 1px;border-color: #ccc;margin-left: 12px;padding-left: 13px;width: 136px;height: 40px;border-radius: 3px;">
                      <option value="中国">中国</option>
                    </select>
                  <v-distpicker @selected="onSelected" :placeholders="placeholder"
                                :province="materialData.province"  hide-area
                                :city="materialData.city"
                                class="datepicker"></v-distpicker>
                  </el-form-item>

                  <el-form-item
                                breakpoint="md"
                                label="生日" class="program">
                    <el-select class="year-el-select" v-model="birthdayYear">
                      <el-option v-for="item in yearoptions" :value="item" :key="item" :label="item">{{item}}</el-option>
                    </el-select>
                    <el-select class="month-el-select" v-model="birthdayMonth">
                      <el-option v-for="item in monthoptions" :value="item" :key="item" :label="item">{{item}}</el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                                 label-align="right"
                                breakpoint="md"
                                label="职业" class="program">
                    <el-select class="profession-el-select" v-model="materialData.profession" placeholder="请选择">
                      <el-option v-for="item in professionGroup" :key="item.key" :value="item.key" :label="item.value"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                                 label-align="right"
                                breakpoint="md"
                                label="星座" class="program">
                    <el-select class="constellation-el-select" v-model="materialData.constellation" placeholder="请选择">
                      <el-option v-for="item in constellationGroup" :key="item.key" :value="item.key" :label="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <div style="text-align: center">
                    <el-button style="width: 200px;" @click="saveMaterial">保存</el-button>
                  </div>
                </el-form>
              </div>
            </div>
            <!--访客-->
            <div class="tab-show viewBox" v-if="visitorFlag">
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">昵称</el-col>
                <el-col :span="16" class="data">{{viewData.nickname}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">手机号码</el-col>
                <el-col :span="16" class="data">{{viewData.mobile}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">性别</el-col>
                <el-col :span="16" class="data">{{viewData.sex}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">个人签名</el-col>
                <el-col :span="16" class="data">{{viewData.personalDescription}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">地区</el-col>
                <el-col :span="16" class="data">{{viewData.country+ viewData.province+viewData.city}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">生日</el-col>
                <el-col :span="16" class="data">{{viewData.birthday}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">职业</el-col>
                <el-col :span="16" class="data">{{viewData.profession}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="3" :span="2" class="title">星座</el-col>
                <el-col :span="16" class="data">{{viewData.constellation}}</el-col>
              </el-row>
            </div>
            <div class="tab-show fansBox">
              <fans :userId="userId"></fans>
            </div>
            <div class="tab-show followBox">
              <follow :userId="userId"></follow>
            </div>
            </div>
        </div>
    </div>
    <imgCrop field="file"
             v-model="imgCropFlag"
             @crop-upload-success="cropImgSuccess"
             @crop-upload-fail="cropImgFail"
             :width="300"
             :height="300"
             url="http://www.colourcan.net/api/qiniu/upload"
             img-format="png"></imgCrop>
  </div>
</template>

<script>
  import imgCrop from 'vue-image-crop-upload';
  import VDistpicker from 'v-distpicker'
  import Datepicker from 'vuejs-datepicker';
  import {zh} from 'vuejs-datepicker/dist/locale'
  import calendar from './calendar'
  import fans from './tab/fans'
  import follow from './tab/follow'

  let personalTabTag,personalTabShow;
  if (typeof window.onload != "function"){
    window.onload = function () {
      personalTabTag = document.getElementsByClassName('tab-tag');
      personalTabShow = document.getElementsByClassName('tab-show');
    };
  }else {
    let oldLoad = window.onload;
    window.onload = function () {
      oldLoad();
      personalTabTag = document.getElementsByClassName('tab-tag');
      personalTabShow = document.getElementsByClassName('tab-show');
    };
  }

  export default {
    name: "record",
    components: { VDistpicker ,Datepicker,calendar,imgCrop, fans, follow},
    data: function () {
      return {
        //图片裁剪工具
        imgCropFlag: false,
        userId:'',
        currentTab: 0,
        baseInfo: {},
        // 是否为访客
        visitorFlag: false,
        // 访客数据
        viewData:{
          nickname: '',
          sex: '',
          mobile: '',
          birthday : '',
          avatar: '',
          country: '',
          province: '',
          city:'',
          profession: '',
          fansCount:'',
          followCount: '',
          popularity:'',
          constellation: ''
        },
        userPicture: "",
        userName:"",
        slogan:"",
        popular: 5100,
        fan: 36,
        focus: 52,
        tabs: 'record',
        //发布记录
        zh: zh,
        yearmonth: '2019-02',
        format: 'yyyy月 MM日',
        //收藏夹
        recordPage: 1,
        recordTotal: 20,
        recordType:'',
        workList:[],
        //资料
        headPicture: null,
        materialData:{
          id:'',
          avatar: '',
          city:'',
          province:''
        },
        placeholder:{province: ' 省份 ',city: ' 市 '},
        options: [
          { text: '男', value: 1 },
          { text: '女', value: 0 },
          { text: '保密', value: 2 }
        ],
        sexOption:{
          1:'男',
          0:'女',
          2:'保密'
        },
        uploadData:{
          avatar: '',
          name: '',
          phone: '',
          sex : '',
          slogan: '',
          birthday: '',
          occupation: '',
          constellation: ''
        },
        yearoptions: ['年',2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,
        2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,
          1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,
          1958,1957,1956,1955],
        monthoptions: ['月','01','02','03','04','05','06','07','08','09','10','11','12'],
        birthdayYear: '年',
        birthdayMonth: '月',
        profession: null,
        professionGroup: [{
          key: null,
          value :"请选择职业"
        },{
          key:"学生",
          value :"学生"
        },{
          key:"计算机/互联网/通信/电子",
        value:"计算机/互联网/通信/电子"
        },{
          key:"会计/金融/银行/保险",
          value:"会计/金融/银行/保险"
        },{
          key:"贸易/消费/制造/营运",
          value:"贸易/消费/制造/营运"
        },{
          key:"制药/医疗",
          value:"制药/医疗"
        },{
          key:"广告/媒体",
          value:"广告/媒体"
        },{
          key:"房地产/建筑",
          value:"房地产/建筑"
        },{
          key:"专业服务/教育/培训",
          value:"专业服务/教育/培训"
        },{
          key:"服务业",
          value:"服务业"
        },{
          key:"物流/运输",
          value:"物流/运输"
        },{
          key:"能源/原材料",
          value:"能源/原材料"
        },{
          key:"政府/非营利性组织/其他",
          value:"政府/非营利性组织/其他"
        }],
        constellation: null,
        constellationGroup: [{
          key: null,
          value: "请选择星座",
        },{
          key: "魔羯座",
          value: "魔羯座",
        },{
          key: "水瓶座",
          value: "水瓶座",
        },{
          key: "双鱼座",
          value: "双鱼座",
        },{
          key: "白羊座",
          value: "白羊座",
        },{
          key: "金牛座",
          value: "金牛座",
        },{
          key: "双子座",
          value: "双子座",
        },{
          key: "巨蟹座",
          value: "巨蟹座",
        },{
          key: "狮子座",
          value: "狮子座",
        },{
          key: "处女座",
          value: "处女座",
        },{
          key: "天秤座",
          value: "天秤座",
        },{
          key: "天蝎座",
          value: "天蝎座",
        },{
          key: "射手座",
          value: "射手座",
        }]
      }
    },
    methods:{
      cropImgSuccess(res, field){
        this.materialData.avatar = res.data;
      },
      cropImgFail(status, field){
        this.$message('上传图片失败');
      },

      // 更换标签
      changeTab:function(tabIndex){
        if (tabIndex == this.currentTab) return true;
        // 当前的标签
        personalTabTag[tabIndex].className += ' active';
        personalTabShow[tabIndex].className += ' active';

        // 上个标签
        let lastTabClass = personalTabTag[this.currentTab].className;
        let lastTabShowClass = personalTabShow[this.currentTab].className;
        personalTabTag[this.currentTab].className = lastTabClass.replace(/ active/,'');
        personalTabShow[this.currentTab].className = lastTabShowClass.replace(/ active/,'');
        this.currentTab = tabIndex;
      },
      //获得基本信息
      getBaseInfo:function(){
        let self = this;
        this.$axios({
          method: 'get',
          baseURL: self.domainName,
          url: '/profile/baseInfo/' + self.userId
        }).then(function (res) {
          self.baseInfo = res.data.data;
        }).catch(function (err) {
          self.$message('获取基本信息失败');
        })
      },
      // 收藏夹
      deleteFavorite: function (id,index) {
        let self = this;
        this.$axios({
          method: 'del',
          baseURL:self.domainName+'/favourite',
          url: '/' + id,
        }).then((res)=>{
          this.workList.splice(index, 1);
        }).catch((error)=>{
          self.$message('删除失败');
        })
      },
      // 查询作品
      checkWork:function(id){
        this.$router.push({path: '/detail', name: 'detail', query: {id: id}});
      },
      //查看用户
      checkUser:function(userId){
        this.$router.push({path: '/personalHome', name: 'personalHome', params:{userId: userId}});
      },
      onSelected:function (data) {
        this.materialData.city = data.city.value;
        this.materialData.province = data.province.value;
      },
      setRecordType:function(type){
        let self = this;
        this.recordType = type;
        if(type === ''){
          let self = this;
          this.$axios({
            method: 'get',
            baseURL: self.domainName+'/favourite',
            params:{
              pageNum: self.recordPage,
              pageSize: 20,
              userId: self.userId
            }
          }).then((res)=>{
            self.workList = res.data.data.rows;
            self.recordTotal = res.data.data.total;
          }).catch((error)=>{
            self.$message('获取收藏夹信息失败');
          })
        }else{
          this.recordData();
        }
      },
      recordData(){
        let self = this;
        this.$axios({
          method: 'get',
          baseURL: self.domainName+'/favourite',
          params:{
            type: self.recordType,
            pageNum: self.recordPage,
            pageSize: 20,
            userId: self.userId
          }
        }).then((res)=>{
          self.workList = res.data.data.rows;
          self.recordTotal = res.data.data.total;
        }).catch((error)=>{
          self.$message('获取收藏夹信息失败');
        })
      },
      // 资料
      fakeUploadHeadPic:function(){
        this.imgCropFlag = true;
      },
      uploadHeadPic:function(){
        let formData = new FormData();
        formData.append('file', this.$refs.upload.files[0]);
        let self = this;
        this.$axios({
          method: 'post',
          baseURL: self.domainName+'/qiniu/upload',
          anync:true,
          contentType:false,
          processData:false,
          data:formData
        }).then((res)=>{
          self.materialData.avatar = res.data.data;
        }).catch((error)=>{
          self.$message('图片上传失败');
        })
      },
      materialDataGet:function () {
        let self = this;
        this.$axios({
          method: 'get',
          url:self.domainName+'/profile/'+self.userId
        }).then((res)=>{
          self.materialData = res.data.data;
          self.materialData.province += "省";
          self.materialData.city += "市";
          let birthday = self.materialData.birthday? self.materialData.birthday.split('-') : '';
          self.birthdayYear = birthday[0];
          self.birthdayMonth = birthday[1];
        }).catch((error)=>{
          self.$message('获取个人信息失败');
        })
      },
      saveMaterial:function () {
        let self = this;
        let uploadData = {};
        for (let key in this.materialData){
          uploadData[key] = this.materialData[key];
        }
        try {
          uploadData.mobile = uploadData.mobile.toString();
          uploadData.birthday = this.birthdayYear+ '-' +this.birthdayMonth;
          let province = uploadData.province;
          uploadData.province = province.slice(0, -1);
          let city = uploadData.city;
          uploadData.city = city.slice(0,-1);
        }catch(e){
          this.$message('请补充信息');
          return;
        }
        this.$axios({
          method: 'put',
          baseURL: self.domainName+'/user',
          data: uploadData
        }).then((res)=>{
          self.$message({
            message: '修改个人资料成功',
            type: 'success'
          });
          self.materialDataGet();
          self.getBaseInfo();
          let userData=self.$store.state.userData;
          userData.avatar = self.materialData.avatar;
          userData.nickname = self.materialData.nickname;
          userData.personalDescription = self.materialData.personalDescription;
        }).catch((err)=>{
          self.$message('修改个人资料失败，请补充信息');
        })
      },
      viewDataGet:function () {
        let self = this;
        this.$axios({
          method: 'get',
          baseURL: self.domainName+'/profile',
          url: '/' + self.userId,
        }).then((res)=>{
          self.viewData = res.data.data;
          self.viewData.birthdayYear = res.data.data.birthday.substr(0,4);
          self.viewData.birthdayMonth = res.data.data.birthday.substr(5,2);
          self.viewData.sex = self.sexOption[res.data.data.sex];
          self.country = res.data.data.country;
          self.province = res.data.data.province;
          self.area = res.data.data.area;
        }).catch((error)=>{
          self.$message('获取数据失败');
        })
      },
      getCookieId: function () {
        let userId;
        try {
          userId = JSON.parse(this.getCookie('userData')).id;
        }catch (e) {
          userId = '';
        }
        return userId;
      }
    },
    created:function () {
      let currentId = this.$route.params.id;
      let cookieId = this.getCookieId();
      this.userId = currentId || cookieId;
      this.visitorFlag = cookieId != this.userId;
      let self = this;
      this.setRecordType('');
      this.getBaseInfo();
      // 取得当前用户id
      // var userData=JSON.parse(this.$store.state.userData);
      // this.materialData.avatar=userData.avatar;
      // this.materialData.id =userData.id;
      this.materialDataGet();
      this.viewData.id = this.$route.params.id;
      if (this.visitorFlag){
        this.viewDataGet();
      }
    }
  }
</script>

<style scoped>
  .home{
      padding: 0;
      background-color: #f5f5f5;
  }
  .content{
    overflow: hidden;
    zoom: 1;
    font-size: 16px;
    margin: 0 auto;
    background-color: #fff;
  }
  .information{
    margin-top: 64px;
    text-align: center;
  }
  .userPicture{
    overflow: hidden;
    margin: auto auto;
    width: 120px;
    height: 120px;
    text-align: center;
    border-radius: 50%;
  }
  .userPicture img{
    width: 100%;
    height: 100%;
  }
  .information span{
    display: inline-block;
    font-size: 1.5rem;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  .information p{
    font-size: 16px;
  }
  .atten{
    margin-top: 64px;
    text-align: center;
  }
  .tabBox{
    background: #F6F6F6;
    margin-top: 48px;
  }
  .tabBox .tab{
    /*text-align: center;*/
    /*background: #fff;*/
    overflow: hidden;
    background: #fff;
    height: 33px;
  }
  /*下划线*/
  .tab-top{
    background: #fff;
  }
  .tab-tag a{
    padding: 10px;
    text-decoration: none;
    font-size: 16px;
    color:#999999;
    font-weight: bold;
  }
  .tab-tag.active a{
    color: #515151;
  }
  .tab-tag span{
    margin: 0 auto;
    margin-top: 5px;
    display:block;
    height: 4px;
    width:32px;
    background: inherit;
  }
  .tab-tag.active span{
    background: #4959F6;
  }
  .tab-show{
    width: 100%;
    max-width: 1216px;
    margin: 0 auto;
    display: none;
  }
  .tab-show.active{
    display: block;
  }
  .tabBox .tab .active{
    background: inherit;
    border-right: 0;
    color: #515151;
    font-weight: bold;
    /*border-bottom: 4px solid #4959F6;*/
  }
  .category{
    padding-left: 45px;
  }
  .category .nav-link{
    width: 88px;
    height: 32px;
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    text-align: center;
    color: #515151;
  }
  .category .active{
    /*color: #fff;*/
  }
  /*发布记录*/
  .datepicker{
    display: inline-block;
    height: 32px;
    /*width: 160px;*/
    border-radius: 10px;
  }
  .personalTag{
    text-decoration: none;
    color: #515151;
  }
  .personalTag:hover{
    color: blue;
  }
  /*收藏夹*/
  .workList{
    padding-left: 30px;
    padding-top: 20px;
    text-align: left;
  }
  .work{
    margin-bottom: 24px;
    width: 100%;
    height: 234px;
    border: none;
    overflow: hidden;
  }
  .work div{
    padding: 0;
  }
  .work p{
    margin-top: 16px;
    font-size: 14px;
    line-height: 16px;
    color: #515151;
  }
  .authorPicture{
    cursor: pointer;
    width: 100%;
    height: 148px;
    border-radius: 0;
  }
  .author{
    margin: 0 16px;
  }
  .author p{
    cursor: pointer;
  }
  .author img{
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .author strong{
    cursor: pointer;
    font-size: 12px;
    line-height: 12px;
    font-weight: normal;
    margin-left: 16px;
  }
  .author span{
    position: absolute;
    right: 11px;
    bottom: 18px;
    line-height: 12px;
    font-size: 12px;
    color: #C1C1C1;
  }
  .deleteButton{
    visibility: hidden;
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    text-align: center;
    font-size: 25px;
    line-height: 25px;
    border-radius: 4px;
    background: rgba(0,0,0,0.5);
    text-decoration: none;
    color: #fff;
  }
  .work:hover .deleteButton{
    visibility: visible;
  }
  /*资料*/
  .material{
    margin-top: 22px;
  }
  .material .headpicture{
    display: inline;
    margin-left: 10px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  .program{
    /*margin-right: 42px;*/
    padding: 0 20px;
    text-align: left;
    /*font-size: 14px;*/
  }
  .headpictureUpload{
    display: none;
  }
  .fakeUploadHeadPic{
    margin-left: 10px;
    border: none;
    font-size: 14px;
  }
  .input{
    width: 216px;
    background: rgba(246,246,246,1);
    border: none;
    margin-left: 12px;
  }
  .country-el-select ,.year-el-select, .month-el-select, .profession-el-select, .constellation-el-select{
    padding-left: 13px;
    width: 136px;
    height: 40px;
    border-radius: 3px;
    border-color: #ccc;
  }
  .country-el-select{
    position: relative;
    bottom: 3px;
  }
  .profession-el-select{
    width: 272px;
  }
  /*访客资料*/
  .viewBox,.materialBox{
    width: 60%;
    border-radius: 10px;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 22px;
    margin-bottom: 30px;
  }
  .viewBox .row{
    margin-top: 22px;
  }
  .viewBox .title{
    color: #999999;
    font-size: 14px;
    text-align: right;
  }
  .viewBox .data{
    margin-left: 20px;
    color: #515151;
    font-size: 14px;
    text-align: left;
  }
</style>
