<template>
  <div class="home" >
    <div class="content">
      <div class="detail-container">
          <div class="main " >
              <!--作品详情和评论-->
              <div class="article" v-loading="ArticleLoading">
                  <div class="article-title common-style">
                    <ul >
                        <li style='margin-bottom: 12px'><h1>{{title}}</h1></li>
                        <li  style='margin-bottom: 8px'><em class="font-em">{{publishTime}}</em></li>
                        <ul class="flex-between">
                            <li><em class="font-em">{{tag | changeTag}}</em></li>
                            <ul class="three-icon">  <!--三个图标-->
                                <li><img class="icon-img" :src="imgs.view"><em class="font-em">{{visits}}</em></li>
                                <li><img  class="icon-img" :src="imgs.collection"><em class="font-em">{{favouriteNum}}</em></li>
                                <li><img  class="icon-img" :src="imgs.call"><em class="font-em">{{likeNum}}</em></li>
                            </ul> 
                        </ul>
                    </ul>
                </div><!--作者信息和文章的阅读点赞情况-->
                <div class="article-content common-style">
                    <div v-if="workType === 1" v-html="content">
                     {{content}}
                    </div>
                    <div v-if="workType !== 1"  class="content-img">
                            <!-- <img :src=content /> -->


                        <div v-for="item in content" :key="item">
                            <img :src=item />
                        </div>
                    </div>
                </div> <!--文章的主要内容-->
               
            </div>
            <div class="comment common-style ">
                <div class="flex-between comment-margin-bottom">
                    <textarea  name=text class="comment-textarea" draggable="false" placeholder="发表评论" v-model="commentValue" ></textarea>
                    <!-- <button type="button" class="btn btn-primary user-btn">发表</button> -->
                    <el-button type="primary" class="user-btn btn-my-style" @click="commentFun">发表</el-button>
                </div><!--发表评论文本框-->
                 <ul class="flex-between comment-all-margin-bottom change-style">
                     <li><span class="font-span comment-margin-right">全部评论</span><em class="font-em">{{commentNum}}</em></li>
                     <li><span class="font-span comment-margin-right">时间</span>
                        <el-select v-model="value" placeholder="请选择" @change="changrTimeSort(value)">
                            <el-option
                            v-for="item in stateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>                     
                     </li>
                 </ul><!--评论数和时间排序方式-->
                <div class="comment-main" v-for="(item ,index ) in comment" :value="item.value" :key="index">
                    <div class="comment-head"><img :src="item.fromAvatar"></div><!--评论的用户头像-->
                    <div class="comment-content">
                        <div class="commentuser-margin-bottom"><span class="font-span commentuser-margin-right">{{item.fromName}}</span><em class="font-em">{{item.createTime}}</em></div>
                        <!--评论的人名和时间-->
                        <div><p class="font-span margin-bottom-16">{{item.content}}</p></div><!--评论的内容-->
                        <div>
                            <div style="margin-top: 16px; " v-show="item.children.length > 0 " v-for="(item2 ,index2 ) in item.children"  :value="item2.value" :key="index2">
                                <div class="arrow-up"></div><!--回复区域形状实现的三角形-->
                                <div class="comment-answer font-span">
                                    <p class="deleteBtn" slot="reference" ><span type="text "   icon="el-icon-close" class="deleteStyle el-icon-close" @click="deleteAnswer(item,index2)"></span></p>
                                    <!-- <span slot="reference"></span> -->
                                    <p class="margin-bottom-16">{{item2.fromName}} :
                                    </p>
                                    <p >{{item2.content}}</p>
                                </div><!--回复的内容-->
                            </div><!--回复的内容和回复背景框-->
                            <ul class="comment-icon">

                                <li v-show="item.fromId === userData.id"><em class="font-em" style=" cursor: pointer"  @click="deleteMyComment(item,index)">删除</em></li>
                                <!-- <li v-show="userdata? (userdata.id === item.id) : false"><em class="font-em" style=" cursor: pointer"  @click="deleteMyComment(item,index)">删除</em></li> -->
                                <!--评论-->
                                <li v-show="userData.id === userId && item.fromId !== userId"><img class="icon-img" :src="imgs.commentImg" @click="showAnswerStyle(item,index)"></li>
                               <!--点完赞的有色图标-->
                                <!-- <li  v-show="showCall == index "><img class="icon-img" :src="imgs.callImg" @click="cancelCallFun(item,index)"><em class="font-em" >{{item.likeNum}}</em></li> -->
                                <li  v-if="item.showCall === true"><img class="icon-img" :src="imgs.callImg" @click="cancelCallFun(item,index)"><em class="font-em" >{{item.likeNum}}</em></li>
                               <!--点赞的灰色图标-->
                                <!-- <li  v-show="showCall !== index"><img class="icon-img" :src="imgs.call" @click="callFun(item,index)" ><em class="font-em" >{{item.likeNum}}</em></li> -->
                                <li  v-if="item.showCall === false"><img class="icon-img" :src="imgs.call" @click="callFun(item,index)" ><em class="font-em" >{{item.likeNum}}</em></li>
                            </ul>
                            <div class="flex-between comment-margin-bottom" v-show="commentIndex == index">
                                <textarea  name=text class="comment-textarea" draggable="false" :placeholder="answerCommentUser" v-model="answerCommentValue"></textarea>
                                <button type="button" class="btn btn-primary user-btn btn-my-style" @click="answerCommentFun(item,index)">回复</button>
                            </div><!--回复文本框-->
                        </div><!--回复的内容显示区域-->

                    </div><!--评论回复内容区域-->
                </div><!--评论的用户头像和评论回复区域-->
                <p class="font-em" v-if="!comment.length" style="text-align:center; margin-top:32px">没有更多评论了...</p>
                <el-pagination v-if="comment.length" layout="prev, pager, next"  :page-size='10' class="page-style"    :total=commentNum style="text-align: center; margin-top:32px"
            @current-change=currentPage></el-pagination> 
            </div> <!--评论区域-->
            <!--分页-->
             
            <div>

            </div>
          </div>
          <div class="side ">
              <ul class="user  common-style">
                  <li class="head-sculpture"><img :src="imgs.head" @click='toSelf'></li>
                  <li class="username"><h1>{{nickname}}</h1></li>
                  <li class="user-description"><h2>{{personalDescription}}</h2></li>
                  <li> <button type="button" class="btn btn-primary user-btn btn-my-style" v-show="!showLike" @click="likeFun('like')" :disabled ='userData.id ==userId '>关注</button></li>
                  <li> <button type="button" class="btn btn-primary user-btn btn-my-style" v-show="showLike" @click="likeFun('cancelLike')" :disabled ='userData.id ==userId '>已关注</button></li>
              </ul>
              <ul class="common-style user-icon" >
                 <li v-show="showCollection"><img class="user-icon-img" :src="imgs.lcollection" @click="cancelCollectionWork"><em class="font-large-em">{{favouriteNum}}</em></li>
                 <li v-show="!showCollection"><img class="user-icon-img" :src="imgs.disCollection"  @click="collectionWork"><em class="font-large-em">{{favouriteNum}}</em></li>
                 <li v-show="showCallWork"><img class="user-icon-img" :src="imgs.BCall" @click="cancelCallWork"><em class="font-large-em">{{likeNum}}</em></li>
                 <li v-show="!showCallWork"><img class="user-icon-img" :src="imgs.dcall" @click="callWork"><em class="font-large-em">{{likeNum}}</em></li>
              </ul>
          </div>
      </div>
    </div>
</div>
</template>

<script>
//   $(function () {
//     alert(123);
//   });
  export default {
    name: 'hello',
    filters:{
        changeTag:function(value){
            // let array = value.split(',');
            return value.split(',').join('/');
        }
    },
    // watch:{
    //       id:this.$store.state.userData.id 
        
    // },
    data () {
      return {
          ownerId:'',//文章的ID
          userId:'',//作者ID
          type:1,
          commentUser:{
              fromId:'',//发布评论者的ID
              fromName:'',//发布评论者的名字
              fromAvatar:'',//发布评论者的头像
          },

          //文章的loading
          ArticleLoading:true,
        //   id:this.$store.state.userData && this.$store.state.userData.id ,
        // data 
        // id:this.$store.state.userData?this.$store.state.userData.id : '',
        // id:'',
          title:'',
          publishTime:'',
          tag:'',
          //作品的类别
          workType:'',
          //是否关注
          islike:'',
          //浏览量
          visits:'',
          //点赞数
          likeNum:'',
          //收藏量
          favouriteNum:'',
          //全部评论数
          commentNum:0,
          //作者名
          nickname:'作者名',
          //作者描述
          personalDescription:'作者描述',
          //文章内容
          content:[],
         //当前页数
         pageNum:1,
          articleContent1:'“所谓漫才啊，就是不管他是要卖鱼还是卖菜，都是漫才！”——「神谷」。总结之前练习的一些东西和感悟，作为自己的笔记吧！',
          articleContent2:'为了让整个页面的动效展示更加流畅和清晰的展示，做了非常多的调试，希望能够让大家感受到更多的细节。',
          articleImgs:[
              {article1:'../../static/imgs/works/article1.jpg'},
              {article2:'../../static/imgs/works/article2.jpg'},
          ],
          imgs:{
              //头像
              head:"../../static/imgs/works/user.png",
              //点亮收藏量
              lcollection:'../../static/imgs/works/lcollection.png',
              //未点亮收藏量
              disCollection:'../../static/imgs/works/disCollection.png',
              //点赞前大图标
              dcall:require("../../static/imgs/works/dcall.png"),
              //点赞后的大图标
              BCall:'../../static/imgs/works/BCall.png',
              //作品标题的浏览量，收藏量，点赞量
              view:'../../static/imgs/works/view.png',
             //点赞前的图标，小图标
              call:'../../static/imgs/works/call.png',
              collection:'../../static/imgs/works/collection.png',
              //点击图标即可评论
              commentImg:'../../static/imgs/works/comment.png',
              //为评论点赞(点赞后的图标)
              callImg:'../../static/imgs/works/lcall.png',
            },
            /*评论内容*/
            commentValue:'',
            /*显示回复框*/
            showAnswer: false,
            /* 显示回复内容*/
            answerContentDiv:false,
            /*绑定某个回复框*/
            commentIndex:-1,
            /**回复评论的用户名： 回复XX (placeholder)*/
            answerCommentUser:'',
            /*回复评论的内容*/
            answerCommentValue:'',
            /*评论点赞图标，-1表示显示的是灰色的点赞图标*/
            // showCall:-1,
            /*显示判断是否确定删除回复的窗口*/
            deleteAnswerVisible: false,
            /** */   
            comment:[],
            /* 排序，倒序*/
            value:'',
            stateList: [
                {
                    value: 'timedesc',
                    label: '倒序'
                },
                {
                    value: 'timeasc',
                    label: '顺序'
                },
            ] ,
            /*点击收藏作品*/
            showCollection: '',
            /*点击点赞作品*/
            showCallWork:'',
            /* 点击关注作者*/
            showLike:'',
            comment:[],
            
        }
    },

    created(){
        this.ownerId =this.$route.query.id
        console.log('id',this.ownerId)
        // this.getDetail();
        // this.getComment();  
        this.getAll();   
    },
    computed:{
         userData(){
            return this.$store.getters.getuserData || ''
        }
    },
    methods:{
        //到个人主页
        toSelf(){
          let param = {
            path: '/personalHome',
            name:'personalHome',
            params: {
              'id':this.userId
            } 
          }
          this.$router.push(param)
        },        
        //获取文章页面
        getDetail(){
            return this.$axios.get(this.domainName + '/work/'+this.ownerId,{
                 headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    }
            })
        },
        //获取评论
        getComment(value){
            return this.$axios.get(this.domainName+ '/comment/'+this.ownerId,{
                 params:{...value,
                    pageSize:10
                 },
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
            })
        },
        //同时处理文章跟评论
        getAll(){
            let that = this;
            this.$axios.all([this.getDetail(),this.getComment(),this.getCallWork(),this.getCollectionWork()]).then(
                this.$axios.spread(function(res, perms,call,collection){
                     if(res.data.code === 20000){
                        that.userId = res.data.data.work.userId,//作者ID
                        that.ownerId = res.data.data.work.id;//作品的ID
                        that.title = res.data.data.work.title;//作品标题
                        that.tag = res.data.data.work.tag;//作品标签
                        that.publishTime = res.data.data.work.publishTime;//发布时间
                        //that.updateTime = res.data.data.work.updateTime;//更新时间????????
                        that.workType =  res.data.data.work.type;
                        if(that.workType == 1){
                            that.content = res.data.data.work.content;//作品内容
                        }else{
                            if(res.data.data.work.content.split(',')){
                                
                                that.content = res.data.data.work.content.split(',');
                            }else{
                                that.content.push(res.data.data.work.content);
                            }
                            
                        }

                        that.visits = res.data.data.work.visits;//浏览数
                        that.likeNum = res.data.data.work.likeNum;//点赞数
                        that.favouriteNum = res.data.data.work.favouriteNum;//收藏数
                        that.commentNum = res.data.data.work.commentNum;//评论数
                        //作者详情
                        //  id = (res.data.relationVO.id;//作者ID
                        that.imgs.head = res.data.data.relationVO.avatar;//作者头像
                        that.nickname = res.data.data.relationVO.nickname;//作者的用户名
                        that.personalDescription = res.data.data.relationVO.personalDescription;//作者的简介
                        that.islike= res.data.data.relationVO.islike;//是否关注了作者。-1表示没有关系，0表示关注 1表示互相关注
                        //  that.imgs.head = res.data.relationVO.followTime;//???????
                        if(that.islike ===0){
                            //未关注
                            that.showLike =  false;
                        }else if(that.islike === 2 || that.islike === 1){    
                            that.showLike =  true;
                        }
                        that.getCallWork();
                        that.getCollectionWork();                   
                        }
                        if(call.data.data){
                            that.showCallWork = true;
                        }else{
                            that.showCallWork = false;
                        }
                         if(collection.data.data){
                                that.showCollection = true;
                            }else{
                                that.showCollection = false;
                            }
                    if(perms.data.code === 20000){
                        
                        that.AddCommentData(perms);
                        //获取评论点赞状态
                        that.ArticleLoading = false;
                    }
                })
            ).catch((error)=>{
                    this.$message.error('请检查网络')
                })
        },
        //添加评论的数据
        AddCommentData(perms){
            this.commentNum = perms.data.data.total;
            this.comment = perms.data.data.rows;
            this.getCallStatus();
        },

        //添加关注
        //关注和取消关注作者
        likeFun(value){
            if(this.userData== ''){
                this.$message.error('请先登录');
            }else{
                    switch(value){
                case 'like':
                    this.$axios({
                    method:'post',
                    url:this.domainName+ '/follow/'+this.userId,
                    
                    headers:{
                            'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((res)=>{
                    this.showLike = !this.showLike;
                    this.$message({
                        message: '关注成功',
                        type: 'success'
                    });
                    this.likeNum = 0;
                }).catch((error)=>{

                })
                 break;
                 case 'cancelLike':
                    this.$axios({
                    method:'delete',
                    params:{
                        islike:this.islike
                    },
                    url:this.domainName+ '/follow/'+this.userId,
                    headers:{
                            'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((res)=>{
                    this.showLike = !this.showLike;
                    this.likeNum = res.data.data;
                    this.$message({
                        message: '已取消关注',
                        type: 'success'
                    });
                }).catch((error)=>{

                })
                 break;
            }
            }
        },
        
        /*发表评论*/
        commentFun(){
            if(this.userData== ''){
                this.$message.error('请先登录');
            }else{
                            if(this.commentValue == ''){
                this.$message({
                        message: '评论内容不能为空',
                        type: 'error'
                    });
                }else{
                    let postData={
                        ownerId:this.ownerId,
                            //发布评论者
                            fromId:this.userData.id,//ID
                            fromName:this.userData.nickname,//昵称
                            fromAvatar:this.userData.avatar,//头像 
                            //评论对象
                            told:null,//null 表示评论作品，不是回复
                            toName:'',//昵称
                            toAvatar:'',
                            parentId:'',
                            type:1,
                            content:this.commentValue,
                    } 
                    this.$axios({
                        method:'post',
                        url:this.domainName+ '/comment',
                        data:postData,
                        headers: {
                            'Content-Type': 'application/json',
                            }
                        }).then((res)=>{
                            if(res.data.code === 20000 ){
                                postData.likeNum = 0;
                                postData.id = res.data.data;
                                postData.showCall = false;
                                this.comment.unshift(postData);

                                this.commentValue = '';
                                this.$message({
                                    message: '发表评论成功',
                                    type: 'success'
                                });
                            }
                        }).catch((error)=>{
                            console.log(error);
                        })
                } 
            }
   
        },
        /* 点击评论图标，展示回复框*/
        showAnswerStyle(item,index){
             if(this.userData== ''){
                this.$message.error('请先登录');
            }else{
                    this.commentIndex = this.commentIndex === index ? -1 : index;
                    if(this.commentIndex === index){
                        this.answerCommentUser = '回复'+ item.fromName;
                    }
                    this.showAnswer = !this.showAnswer;
            }
            
        },
        /*回复评论*/
        answerCommentFun(item,index){
            if(this.userData== ''){
                this.$message.error('请先登录');
                }else{
                     if(this.answerCommentValue == ''){
               this.$message({
                    message: '回复内容不能为空',
                    type: 'error'
                });
            }else{
                let postData = {
                    ownerId:this.ownerId,
                    //发布评论者
                         fromId:this.userData.id,//ID
                         fromName:this.userData.nickname,//昵称
                         fromAvatar:this.userData.avatar,//头像
                        
                        // 评论对象
                        toId:item.fromId,//null 表示评论作品，不是回复
                        toName:item.fromName,//昵称
                        toAvatar:item.fromAvatar,
                        parentId:item.id,
                        type:2,
                        content:this.answerCommentValue,
                }
                // item.answer.push( this.answerCommentValue );
                item.answerUsername = this.userData.nickname; //这里插入的是文章的作者名
                // this.commentIndex = -1;
                // this.answerCommentValue = '';
                this.$axios({
                    method:'post',
                    url:this.domainName+ '/comment',
                    data: postData,
                    headers: {
                        'Content-Type': 'application/json',
                        }
                    }).then((res)=>{
                        if(res.data.code === 20000 ){
                             this.answerCommentValue = '';
                             postData.id = res.data.data;
                             item.children.unshift(postData);
                             this.commentIndex = -1;
                            this.$message({
                                    message: '回复评论成功',
                                    type: 'success'
                            });
                        }
                    }).catch((error)=>{
                        console.log(error);
                    })
                }
            }
           
        },
        //评论点赞
        callFun(item, index){
            if(this.userData== ''){
                this.$message.error('请先登录');
                }else{
                    this.$axios({
                    method:'get',
                    url:this.domainName+ '/comment/like/'+item.id,
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                    // data: {commentId:}
             }).then((res)=>{
                 if(res.data.code === 20000){
                     item.showCall = true;
                         item.likeNum  = res.data.data;
                 }
             }).catch((error)=>{

             })
            }
             
        },
        //取消点赞
        cancelCallFun(item, index){
            if(this.userData== ''){
                this.$message.error('请先登录');
            }else{
                 this.$axios({
                    method:'delete',
                    url:this.domainName+ '/comment/unlike/'+item.id,
                    // data: {commentId:}
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
             }).then((res)=>{
                 if(res.data.code === 20000){
                     item.showCall = false;
                         item.likeNum  = res.data.data;
                 }
             }).catch((error)=>{

             })
            }
            
        },
        //获取评论点赞状态
        getCallStatus(){
            let length = this.comment.length;
            for(let i= 0; i< length; i++){
                // this.comment[i].showCall = false;
            
                this.$axios({
                        method:'get',
                        url:this.domainName+ '/comment/islike/'+this.comment[i].id,
                        // data: {commentId:}
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                }).then((res)=>{
                     if(res.data.code === 20000){
                    this.$set(this.comment[i],'showCall',res.data.data)                     
                 }
                }).catch((error)=>{
                })
        }
        // this.comment = Object.assign({}, this.comment, { a: 1, b: 2 })
        return true;
        },
        //删除回复
        deleteAnswer(item,index2){             
            this.$axios({
                method:'delete',
                url:this.domainName+ '/comment/'+ item.children[index2].id,
                params:{
                    type:2
                },
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
                // data: {commentId:}
            }).then((res)=>{
                if(res.data.code === 20000){
                        item.children.splice(index2, 1); 
                        this.$message({
                        message: '删除成功',
                        type: 'success'
                    });          
                }
            }).catch((error)=>{

            }) 
        },
        //删除自己的评论
        deleteMyComment(item, index){

            this.$axios({
                    method:'delete',
                    url:this.domainName+ '/comment/'+item.id,
                    params:{
                        type:1
                    },
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                    // data: {commentId:}
             }).then((res)=>{
                    if(res.data.code === 20000){
                         this.comment.splice(index, 1); 
                          this.$message({
                            message: '删除成功',
                            type: 'success'
                        });          
                    }
             }).catch((error)=>{

             }) 
        },
        //改变评论时间排序
        changrTimeSort(value){
            this.getComment({sortType:this.value,pageNum:this.pageNum}).then((res)=>{
                if(res.data.code === 20000 ){
                    this.AddCommentData(res);
                }
            }).catch((error)=>{
            
            });
        },
        //分页
        currentPage(value){
            this.pageNum = value;
            this.getComment({sortType:this.value,pageNum:this.pageNum}).then((res)=>{
                if(res.data.code === 20000 ){
                    this.AddCommentData(res);
                }
            }).catch((error)=>{
            
            });
        },
        //点赞作品
        callWork(){
            if(this.userData== ''){
                 this.$message.error('请先登录');
            }else{
                this.$axios({
                method:'post',
                url:this.domainName+ '/work/like/'+this.ownerId,
                headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((res)=>{
                    if(res.data.code === 20000){
                    this.showCallWork = !this.showCallWork;
                        this.likeNum = res.data.data;//点赞数
                    }
                }).catch((error)=>{

                })
            }
            
        },
        //取消点赞作品
        cancelCallWork(){
            if(this.userData== ''){
                 this.$message.error('请先登录');
            }else{
                this.$axios({
                method:'delete',
                url:this.domainName+ '/work/unlike/'+this.ownerId,
                headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',

                }
                }).then((res)=>{
                    if(res.data.code === 20000){
                    this.showCallWork = !this.showCallWork;
                        this.likeNum  = res.data.data;//点赞数
                        
                    }
                }).catch((error)=>{

                })
            }
             
        },
         //获取作品点赞状态
        getCallWork(){
            return this.$axios.get(this.domainName+'/work/islike/'+this.ownerId,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        
        },
        //收藏作品
        collectionWork(){
            if(this.userData== ''){
                 this.$message.error('请先登录');
            }else{
                this.$axios({
                method:'post',
                url:this.domainName+'/favourite',
                data:{
                    workId:this.ownerId,
                    type: this.workType
                },
                headers:{
                        'Content-Type': 'application/json',
                }
                }).then((res)=>{
                    if(res.data.code === 20000){
                    this.showCollection = !this.showCollection;
                    this.$message.success('收藏成功')
                        this.favouriteNum = res.data.data;
                    }
                }).catch((error)=>{
                     this.$message.error('收藏失败，请重试')
                })
            }
             
        },
        //取消收藏作品
        cancelCollectionWork(){
            if(this.userData== ''){
                this.$message.error('请先登录');
            }else{
                this.$axios({
                method:'delete',
                url:this.domainName+'/favourite/'+this.ownerId,
                headers:{
                        'Content-Type':'application/x-www-form-urlencoded',
                }
                }).then((res)=>{
                if(res.data.code === 20000){
                    this.showCollection = !this.showCollection;
                    this.$message.success('取消收藏成功');
                        this.favouriteNum  = res.data.data;

                    }
                }).catch((error)=>{

                })
            }
             
        },
        //获取作品收藏状态
          getCollectionWork(){
              return this.$axios.get(this.domainName+'/favourite/'+this.ownerId,{
                  headers:{
                        'Content-Type':'application/x-www-form-urlencoded',
                }
              })
          },
    }
  }
</script>
 
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .home{
      padding: 0;
      background-color: #f5f5f5;
  }
  .content{
    overflow: hidden;
    zoom: 1;
    font-size: 16px;
    width: 1136px;
    margin: 0 auto;
    background-color: #fff;
  }
ul,li {
    list-style: none;
    
}
p{
    margin: 0;
}
h1, h2{
    margin: 0;
}
em{font-style:normal}
img{
    cursor: pointer;
}
/*字体大小*/
    .font-span{
        font-size: 14px;
        color: #515151;
        line-height:18px;
        font-weight:500;
    }
    .font-em{
         font-size: 14px;
        color: #C1C1C1;
        line-height:14px;
        font-weight:500;
    }
    .font-large-em{
        font-size: 16px;
        color: #999999;
        line-height:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
/*背景为灰色*/
.container-fluid{
    background-color: #F6F6F6;
    color: #515151;
}
/*实现main side左右布局*/
.detail-container{
    margin-top: 24px;
    padding: 0;
    text-align: center;
    display: -webkit-flex; /* Safari */
    display:flex;
    justify-content:space-between
}
.main{
    width: 75%;
    text-align: left;    
    border-radius:4px;
    
}
.side{
    width: 23%;
}

/*作品详情跟评论 个人信息 的共同样式*/
.common-style{
    padding: 32px;
    background:rgba(255,255,255,1);
    border-radius:4px;
}
/*评论区域*/
.comment{
     margin-bottom: 140px;
}

/*文章内容*/
.article-content{
    /* margin-bottom: 24px; */
}
/*作品详情标题信息和文章的阅读情况*/
.article-title{
    margin-bottom: 1px;  
}
.article-title h1{
    font-size: 24px;
    font-weight: 600;
    color: #515151;
    line-height:24px;
}

.article-content p{
    font-size: 16px;
    line-height: 24px;
    color: #515151;
}

/*左右布局*/
.flex-between{
   display: -webkit-flex; /* Safari */
    display:flex;
    justify-content:space-between
}
.three-icon{
    width: 28%;
    display: -webkit-flex; /* Safari */
    display:flex;
    justify-content:space-around;
}
.three-icon li{
    display: inline;  
}
/*浏览量，收藏量图标*/
.icon-img{
    margin-right: 8px;
    vertical-align:middle;
    margin-bottom: 4px;
}
.user{
    margin-bottom: 1px;
}
/*作者的头像，说说信息*/
/*头像*/
.head-sculpture img{
    width:80px;
    height:80px;
    border-radius:50%;
    display: inline-block;
    margin-bottom: 48px;
}
/* .user-description{ */
    /* margin-top: 16px; */
    /* margin-bottom: 32px; */
/* } */
/*用户名*/
.side h1{
    font-size: 16px;
    font-weight: 500;
    color: #515151;
    line-height:16px;
}
/*个人简介*/
.side h2{
    font-size: 12px;
    color: #C1C1C1;
    margin-top: 16px;
    margin-bottom: 32px;
}
/*关注按钮*/
.user-btn{  
    width: 88px;
    height: 40px;    
}
.btn-my-style{
    background: #4959F6;
    border-radius:4px;   
    border-color: #4959F6;
}
.btn-my-style:hover{
     background: #5f6df7;
      border-color: #5f6df7; 
}
.btn-my-style:focus {
     background: #5f6df7;
      border-color: #5f6df7; 
}
.user-icon{
   display: -webkit-flex; /* Safari */
    display:flex;
    justify-content:space-around;
    padding-right: 0;
    padding-left: 0;
}
.user-icon-img{
     margin-right: 8px;
    vertical-align:text-bottom;
    
}

/*评论区域*/
 /*评论区域*/
    .comment-main{
        margin-top: 24px;
        border-bottom: 1px solid #EEEEEE
    }
    /*全部评论数*/
    .comment-all-margin-bottom{
        margin-bottom: 64px;
    }
    /*评论人的头像*/
    .comment-head img{
    width:48px;
    height:48px;
    border-radius:50%;
    float: left;
}
    /*评论区的内容*/
    .comment-content{
        margin-left: 60px;
    }

    /*评论区的三角形*/
    .arrow-up {
    width:0; 
    height:0; 
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    border-bottom:10px solid rgba(246,246,246,1);
    margin-left: 20px;
    }
    /*删除评论*/
    .deleteBtn{
        text-align: right;
        padding-top: 5px;
    }
    /*删除按钮的样式*/
    .deleteStyle{
        color: #515151;
        cursor: pointer;
    }
    .deleteStyle:hover{
        color:#aba2a2
    }
    /*回复框*/      
    .comment-answer{
        background-color: rgba(246,246,246,1);
        width: 100%;
        padding: 0 24px;
        padding-bottom: 22px;
        border-radius:4px;
    }
    /*回复的人*/
    .margin-bottom-16{
        margin-bottom: 16px;
    }
    /*评论的图标*/
    .comment-icon{
        margin: 25px 0;
        display: -webkit-flex; /* Safari */
        display:flex;
        justify-content:flex-end;
    }
    .comment-icon li{
        margin-left: 36px;
    }
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #C1C1C1;
  font-size: 14px;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #C1C1C1;
  font-size: 14px;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #C1C1C1;
  font-size: 14px;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #C1C1C1;
  font-size: 14px;
}
/*评论框*/
.comment-textarea{
    background:rgba(246,246,246,1);
    border-radius:4px;
    padding: 13px 14px;
    width: 78%;
    height: 40px;
    border: none;
    resize: none;
    color: #C1C1C1;
    font-size: 14px;
    line-height:20px;
    overflow-y:hidden
}
/*发表按钮的下外边距*/
.comment-margin-bottom{
    margin-bottom: 34px;
}
/*评论数*/
.comment-margin-right{
    margin-right: 16px;
}
/*评论的人与评论时间的间距*/
.commentuser-margin-right{
    margin-right: 24px;
}
.commentuser-margin-bottom{
    margin-bottom: 20px;
}
/*排序评论时间*/
/*文章的图片*/
.content-img{
    /* width: 100%; */
}
.content-img img{
    max-width: 100%;
    margin-bottom: 20px;
}
</style>
<style>
 .change-style .el-input__inner{
            height: 24px;
            width:96px;
            color:#515151;
            border:1px solid rgba(238,238,238,1);
            border-radius:4px;
    }
    .change-style .el-input{
        font-size:12px;
        /* font-family:PingFangSC-Medium; */
        font-weight:500;
        color:rgba(81,81,81,1);
        line-height:14px;
    }
    .change-style .el-input__icon{
        line-height:12px;
    }
    .el-select-dropdown__item.selected{
        color:#4959F6;
     }
    .el-select-dropdown__item.hover {
   background:rgba(73,89,246,0.08)
      }
      .el-select-dropdown__item{
          font-size:12px;
          height: 24px;
    line-height: 24px;
    /* padding-left:15px; */
      }
 </style>