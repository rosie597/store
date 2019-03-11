<template>
    <div>
        <div style="margin-top: 16px; " v-show="item.children.length != 0 "  v-for="(item2 ,index2 ) in item.children"  :value="item2.value" :key="index2">
            <div class="arrow-up"></div><!--回复区域形状实现的三角形-->
            <div class="comment-answer font-span">
                <p class="deleteBtn" slot="reference" ><span type="text "   icon="el-icon-close" class="deleteStyle el-icon-close" @click="deleteAnswer(item,index2)"></span></p>
                <!-- <span slot="reference"></span> -->
                <p class="margin-bottom-16">{{item2.fromName}} :
                </p>
                <p >{{item2.content}}</p>
            </div><!--回复的内容-->
        </div><!--回复的内容和回复背景框-->
        
        <div class="flex-between comment-margin-bottom" v-show="commentIndex == index">
            <textarea  name=text class="comment-textarea" draggable="false" :placeholder="answerCommentUser" v-model="answerCommentValue"></textarea>
            <button type="button" class="btn user-btn btn-my-style" @click="answerCommentFun(item,index)">回复</button>
        </div><!--回复文本框-->
    </div>
    <!--回复的内容显示区域-->
</template>
<script>
export default {
    props:['index','item','commentIndex'],
    data(){
        return{
            /**回复评论的用户名： 回复XX (placeholder)*/
            answerCommentUser:'',
            /*回复评论的内容*/
            answerCommentValue:'',
        }
    },

    computed:{
        userData(){
            return JSON.parse(this.$store.getters.getuserData)
        }
    },
    methods:{
        
        /*回复评论*/
        answerCommentFun(item,index){
            if(this.answerCommentValue == ''){
               this.$message({
                    message: '回复内容不能为空',
                    type: 'error'
                });
            }else{
                let postData = {
                        ownerId:item.workId,
                    //发布评论者
                         fromId:this.userData.id,//ID
                         fromName:this.userData.nickname,//昵称
                         fromAvatar:this.userData.avatar,//头像
                        
                        // 评论对象
                        told:item.sendId,//null 表示评论作品，不是回复
                        toName:item.sendNickname,//昵称
                        toAvatar:item.sendAvatar,
                        parentId:item.id,
                        type:2,
                        content:this.answerCommentValue,
                }
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
                             this.$emit('addAnswerFun',[index,postData])
                             this.$emit('changeCommentIndex')
                            this.$message({
                                    message: '回复评论成功',
                                    type: 'success'
                            });
                        }
                    }).catch((error)=>{
                        console.log(error);
                    })
                }
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
            }).then((res)=>{
                if(res.data.code === 20000){
                      this.$emit('deleteComment',[this.index,index2])
                        this.$message({
                        message: '删除成功',
                        type: 'success'
                    });          
                }
            }).catch((error)=>{

            }) 

        },
    }
}
</script>

<style scoped>
.btn-my-style{
    background: #4959F6;
    border-radius:4px;   
    border-color: #4959F6;
    color: #fff;
}
.btn-my-style:hover{
     background: #5f6df7;
      border-color: #5f6df7; 
     color: #fff;

}
.btn-my-style:focus {
     background: #5f6df7;
      border-color: #5f6df7; 
    color: #fff;

}

</style>
