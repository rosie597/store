<template>
    <div>
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
                        <li v-show="item.fromId === commentUser.fromId"><em class="font-em" style=" cursor: pointer"  @click="deleteMyComment(item,index)">删除</em></li>
                        <li v-show="commentUser.fromId === userId && item.fromId !== userId"><img class="icon-img" :src="imgs.commentImg" @click="showAnswerStyle(item,index)"></li>
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
    </div>
</template>

<script>
export default {
    data(){
        return{

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
        }
    },
    props:['comment']
}
</script>

<style scoped>

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
    margin-bottom: 24px;
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
    color: #515151
}
.article-content img{
    width: 100%;
    margin: 30px 0;
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
.user-description{
    /* margin-top: 16px; */
    /* margin-bottom: 32px; */
}
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
