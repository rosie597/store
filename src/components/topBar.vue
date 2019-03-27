<template>
	<div class="topBar">
		<div class="top">
	        <span class="top_logo">logo</span>
		    <div class="box1">
		    	<span :class="$route.path.endsWith('/')?linkClass[0]:linkClass[1]" @click="$router.replace('/')">作品</span>
		    	<span :class="$route.path.includes('/photo')?linkClass[0]:linkClass[1]" @click="$router.replace('/photo')">摄影</span>
		    	<span :class="$route.path.includes('/articles')?linkClass[0]:linkClass[1]" @click="$router.replace('/articles')">文章</span>
		    </div>
		    <!-- 搜索框 -->
			<div class="inputCtn">
				<input type="text" name="search" class="searchIpt" placeholder="输入关键字" @keyup='keyupFn(searchVal)' v-model='searchVal'/>
				<img class='search' src="../../static/imgs/search.png" @click='searchFn(searchVal)'>
			</div>
			<div class="hoverBox"  :style="$store.state.isLogin?'right:80px;':'right:160px;'">
				<span class="hover_b" @click="toMail" v-if='$store.state.isLogin' @mouseover="hoverFn(1)" @mouseout="hoverFn(2)">
				消息
					<i class="noteIcon" v-if="hasNotice"></i>
				</span>
				<!-- 站内信滑过框 -->
				<div class="infoBox" v-if="isInfoShow" @mouseover="hoverFn(1)" @mouseout="hoverFn(2)">
					<div v-for="item of notice" class="noticeBox">
						<div class="noticeTitle ellipsis">{{item.msg}}</div>
						<span class="noticeDate">{{item.sendDate}}</span>
					</div>
					<div class="view_more" @click="toMail">查看更多</div>
				</div>
			<!-- </div>
			<div class="hoverBox" :style="$store.state.isLogin?'':'margin-left:15%;'"> -->
				<span class="hover_b" @click="toContribute()" @mouseenter="hoverFn(3)" @mouseleave="hoverFn(4)">投稿</span>
				<!-- 投稿划过框 -->
				<div class="itemsBox" v-if="isItemShow" @mouseenter="hoverFn(3)" @mouseleave="hoverFn(4)" :style="$store.state.isLogin?'':'left:-19px;'">
					<span v-for="(item,index) of items" :key='item' class="item_" @click="toContribute(index)">{{item}}</span>
				</div>
			</div>
			<div class="btnCtn">
				<el-button  type="primary" class="btn btn1" v-if='!$store.state.isLogin' @click="loginClk('tab2')">注册</el-button>
				<el-button  type="primary" class="btn btn2" v-if='!$store.state.isLogin' @click="loginClk('tab1')">登陆</el-button>
			</div>
			<div class="avatarBox" @mouseenter='hoverFn(5)' @mouseleave='hoverFn(6)' v-if='$store.state.isLogin'>
				<img alt='头像' :src="$store.state.userData.avatar" class="avatar1" @click="toSelfCenter">
			</div>
			<!-- 个人头像滑过框 -->
			<div class="selfBox" v-if='isSelfShow' @mouseenter='hoverFn(5)' @mouseleave='hoverFn(6)'>
				<img :src="$store.state.userData.avatar" class="avatarBig">
				<div class="nickName ellipsis">{{$store.state.userData.nickname}}</div>
				<div class="sign ellipsis">个人签名：{{$store.state.userData.personalDescription
}}</div>
				<div class="btmBox" @click="toSelfCenter">
					<img src="../../static/imgs/self.png">
					<span>个人中心</span>
				</div>
				<div class="btmBox" @click="exitLogin">
					<img src="../../static/imgs/out.png">
					<span>退出登录</span>
				</div>
			</div>
    	</div>

    	<div class="greyCtn" v-if='isLgShow' id="greyCtn">
    		<login-bar v-on:listenClose='recieveCancel' v-bind:tab='tab' v-on:listenSuccess='login' @regist='listenRegist'></login-bar>
    	</div>
	</div>
</template>
<script>
	import loginBar from './loginBar'
	import Vue from 'vue'
	import SockJS from  'sockjs-client'
	import  Stomp from 'stompjs'
	export default{
		name:'topBar',
		components:{
			loginBar
		},
		data(){
			return{
				stompClient:'',
	            timer:'',
				linkClass:['active','link'],
				isLgShow:false,
				isSelfShow:false,
				userData:{},
				hasNotice:false,//是否有站内信
				items:['艺术作品','摄影','文章'],
				isInfoShow:false,
				isItemShow:false,
				// notice:[{title:'你的会员已到期，请赶快充值',date:'2018-12-30'},{title:'快来抽奖啦，下一个锦鲤就是你',date:'2019-01-28'},{title:'你的会员已到期，请赶快充值',date:'2018-01-29'}],
				notice:[],
				searchVal:'',
				tab:'tab1',
				avatar1:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5'
			}
		},
		methods:{
			//注册,登录按钮
			loginClk(tab){
				var that=this
				this.tab=tab
				this.isLgShow=true
				this.bodyHeight=window.innerHeight+"px";
				this.bodyWidth=window.innerWidth
				var t1=setTimeout(()=>{
					let el=document.getElementById('greyCtn');
					el.style.height=that.bodyHeight;
					el.style.width=that.bodyWidth+'px';
				},10)
				$('body').css('overflow','hidden');
			},
			recieveCancel(data){
				this.isLgShow=data
			},
			hoverFn(idx){
				var that=this
      			switch(idx){
      				case 1:{
      					if(that.notice.length>0){
      						this.isInfoShow=true;
      					}
      				}break;
      				case 2:{
      					this.isInfoShow=false
      				}break;
      				case 3:{
      					this.isItemShow=true
      				}break;
      				case 4:{
      					this.isItemShow=false
      				}break;
      				case 5:{
      					this.isSelfShow=true
      				}break;
      				case 6:{
      					that.isSelfShow=false
      				}break;
      			}
      		},
      		//退出登录
      		exitLogin(){
      			this.$store.dispatch('exit')
      			this.isSelfShow=false
      			this.$router.replace('/')
      			//关闭websocket
      			this.disconnect()
      			localStorage.removeItem('notice')
      		},	
      		//搜索
      		searchFn(val){
				this.$router.replace('/search')	
				this.$store.dispatch('searchVal',val)
				this.searchReq(val)	
      		},
      		//监听回车键
      		keyupFn(val){
      			if (event.keyCode == "13") {
					this.$router.replace('/search')
					this.$store.dispatch('searchVal',val)
					this.searchReq(val)	
            	}
      		},
      		//获得搜索结果
      		searchReq(val){
      			var that=this
      			var sort=that.$store.state.sortNum,
      				type=that.$store.state.typeNum 
        		this.$axios({
        			method:'get',
        			url:this.domainName+'/work/search?key='+val+'&pageNum=1&pageSize=20&sort='+sort+'&type='+type
        		}).then((res)=>{
        			
        			if(res.data.code==20000){
        				this.$store.dispatch('total',res.data.data.total)
				        this.$store.dispatch('search',res.data.data.rows)
        			}else{
        				this.$message.error('搜索失败');
        			}
        		}).catch((err)=>{
        			console.log(err)
        			this.$message.error('网络错误');
        		})
      		},
      		//投稿选项
      		toContribute(idx){
      			if(this.$store.state.isLogin==true){
      				switch(idx){
      					case 0:{
      						this.$router.replace('/newWork')
      					}break;
      					case 1:{
      						this.$router.replace('/newPhotograph')
      					}break;
      					case 2:{
      						this.$router.replace('/newArticle')
      					}break;
      				}
      				
      			}else{
      				this.loginClk('tab1')
      			}
      		},
      		//站内信
      		toMail(){
      			this.$router.replace('/mail');
      			this.hasNotice=false
      			this.notice=[]
      			localStorage.removeItem('notice')
      		},
      		toSelfCenter(){
      			var userId=this.$store.state.userData.id
      			let param = {
			        path: '/personalHome',
			        name:'personalHome',
			        params: {
			          'id':userId
			        } 
			    }
			    this.$router.push(param)
			},
		    // initWebSocket(){ //初始化websocket
		    // 	console.log('init')
		    //     const wsuri = "ws://119.29.176.47:9001/notification";        
		    //     this.websock = new WebSocket(wsuri);        
		    //     this.websock.onmessage = this.websocketonmessage;        
		    //     this.websock.onopen = this.websocketonopen;        
		    //     this.websock.onerror = this.websocketonerror;        
		    //     this.websock.onclose = this.websocketclose;
		    // },
		    // websocketonopen(){ //连接建立之后执行send方法发送数据
		    //     let actions = '/user/newMessage';        
		    //     this.websocketsend(actions);
		    // },
	     //    websocketonerror(){//连接建立失败重连
	     //       this.initWebSocket();
	     //    },
		    // websocketonmessage(e){ //数据接收
		    //    const redata = JSON.parse(e.data);
		    // },
		    // websocketsend(Data){//数据发送
		    //    this.websock.send(Data);
		    // },
		    // websocketclose(e){  //关闭
		    //    console.log('断开连接',e);
		    // },
		    initWebSocket(id) {
		    	let token=this.getCookie('token')
	            this.connection(id);
	            let that= this;
	            // 断开重连机制,尝试发送消息,捕获异常发生时重连
	            this.timer = setInterval(() => {
	                try {
                    that.stompClient.send('/send',{},{});
	                } catch (err) {
	                    console.log("断线了: " + err);
	                    that.connection();
	                }
	            }, 5000);
	        },  
	        connection(id) {
	            let socket = new SockJS('http://www.colourcan.net/api/notification');
	            let token=this.getCookie('token')
	            // let id=this.$store.state.userData.id
	            var that=this
	            // 获取STOMP子协议的客户端对象
	            this.stompClient = Stomp.over(socket);
	            let headers = {
	                Authorization:token
	            }
	            // 向服务器发起websocket连接
	            that.stompClient.connect(headers,(frame) => {
	                that.stompClient.subscribe("/user/" + id+ "/queue/subscribe", (msg) => {
	                    that.hasNotice=true
	                    var data=JSON.parse(msg.body)
	                    data.sendDate=data.sendDate.substr(0,10)
	                    switch(data.action){
	                    	case 1:{
	                    		data.msg='你的作品收到1个喜欢'
	                    	}break;
	                    	case 2:{
	                    		data.msg='你的作品被收藏'
	                    	}break;
	                    	case 3:{
	                    		data.msg=data.sendNickname+'评论了你的作品'
	                    	}break;
	                    	case 4:{
	                    		data.msg=data.sendNickname+'回复了你的评论'
	                    	}break;
	                    	case 5:{
	                    		data.msg=data.sendNickname+'关注了你'
	                    	}break;
	                    	case 6:{
	                    		data.msg='你有新提醒'
	                    	}break;
	                    }
	                    if(that.notice.length<3){
	                    	that.notice.unshift(data)
	                    }else{
	                    	that.notice.unshift(data)
	                    	that.notice.pop()
	                    }
	                    localStorage.setItem('notice',JSON.stringify(that.notice))
	                },headers);
	            },(err) => {
	                // 连接发生错误时的处理函数
	                console.log('失败l',err)
	            });
	        },    //连接 后台
	        disconnect() {
	            if (this.stompClient){
	                this.stompClient.disconnect();
	            }
	        },  // 断开连接
	        //登陆成功后打开websocket
	        login(){
	        	let id=this.$store.state.userData.id
	        	this.initWebSocket(id);
	        },
	        //注册成功后添加欢迎语
	        listenRegist(){
	        	var date=new Date()
				var time=Number(date.getYear()+1900)+'-'+Number(date.getMonth()+1)+'-'+date.getDate()
				this.hasNotice=true
	        	this.notice.unshift({
	        		msg:'等你很久了，朋友，欢迎你加入彩罐网。',
	        		sendDate:time
	        	})
	        	this.$store.state.regist=true
	        }
		},

	    created() {
	    	if(this.$store.state.userData){
	    		var id=this.$store.state.userData.id
	    	}
	    	if(id){
	    		this.initWebSocket(id);
	    		this.notice=JSON.parse(localStorage.getItem('notice'))||[]
		        if(this.notice.length>0){
		        	this.hasNotice=true
		        }
	    	}
	    },
		mounted(){
	        let that = this;
	        if(this.getCookie('userData')){
	        	var id=(JSON.parse(this.getCookie('userData'))).id
	        }
	        this.$axios({
	          method: 'get',
	          baseURL: this.domainName,
	          url: '/profile/baseInfo/' + id
	        }).then(function (res) {
	          that.$store.state.userData = res.data.data;
	        }).catch(function (err) {
	          that.$message('获取基本信息失败');
	        })
		},
		beforeDestroy: function () {
	        // 页面离开时断开连接,清除定时器
	        this.disconnect();
	        clearInterval(this.timer);
	    }
	}
	new Vue({
		events:{
			'show':function(msg) {
				this.isLgShow=msg;
			}
		}
	})
</script>
<style scoped>
	*{
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(81,81,81,1);
		line-height:14px;
	}
	.topBar{
		width: 100%;
		height:56px;
		box-shadow:0px 0px 8px 0px rgba(0,0,0,0.12);
		z-index: 99;
		position: fixed;
		top:0;
		left:0;
		background-color: white;
	}
	.top{
		box-sizing: content-box;
		height: 56px;
		width: 1136px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		position: relative;
	}
	.top_logo{
		width: 50px;
		height: 16px;
		color: #5867F7;
		font-size: 15px;
	}
	.nav{
		display: flex;
		flex-direction: row;
	}
	.box1{
		width: 180px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 212px;
		position: absolute;
	}
	.link{
		color: #515151;
	}
	.link:hover{
		color:#4959F6;
		cursor: pointer;
	}
	.active{
		color:#4959F6;
		cursor: pointer;
	}
	.inputCtn{
		width: 256px;
		position: absolute;
		margin-left: 440px;
	}
	.searchIpt{
		width: 100%;
		height: 32px;
		border:none;
		border-radius: 16px;
		background-color: #F6F6F6;
		padding-left: 10px;
	}
	input::-webkit-input-placeholder {
		font-size: 12px;
		color:rgba(193,193,193,1);
     }
	.search{
		width: 16px;
		height: 16px;
		position: absolute;
		top:8px;
		left:90%;
	}
	.hoverBox{
		height: 100%;
		position: absolute;
		display: flex;
	}
	.hover_b{
		box-sizing: content-box;
		height: 56px;
		width: 82px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 66;
	}
	.hover_b:hover{
		box-sizing: content-box;
		height: 56px;
		width: 82px;
		background-color: #F1F2FF;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 66;
	}
	.avatarBox{
		width: 110px;
		height: 110px;
		margin-right: -30px;
		z-index: 66
	}
	.avatar1{
		width: 110px;
		height: 110px;
		border-radius: 50%;
		border:30px solid rgba(0,0,0,0);
	}
	.btn{
		color:white;
		background-color: #4959F6;
		height: 32px;
		line-height: 0;
		text-align: center;
		padding: 18px;
		border:none;
	}
	.btn1{
		border:none;
		background-color: #F6F6F6;
		color: #4959F6
	}
	.btnCtn{
		display: flex;
		margin-left: 2%;
	}
	.noteIcon{
		width:8px;
		height:8px;
		background:rgba(73,89,246,1);
		position: absolute;
		right: 5px;
	    top: 15px;
	    border-radius: 50%;
	}

	/*弹框灰背景*/
	.greyCtn{
		background-color: rgba(127, 127, 127, 0.3);
		z-index: 999;
		position: absolute;
		top: 0;
		left: 0;
		width:100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/*个人头像框*/
	.selfBox{
		width: 280px;
		height: 236px;
		position: absolute;
		top: 56px;
		right: 0;
		background-color: white;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 8px 0px rgba(0,0,0,0.12);
		border-radius:4px;
		z-index: 65
	}
	.avatarBig{
		width: 56px;
		height: 56px;
		border-radius: 50%;
		margin:16px auto;
		display: block;
	}
	.nickName{
		display: block;
		margin: 2px auto;
		width: 114px;
		font-size: 14px;
	}
	.sign{
		display: block;
		margin: 11px auto;
		width: 216px;
		font-size: 12px;
		color:#DBDBDB;
	}
	.btmBox{
		padding: 15px;		
		font-size: 14px;
		line-height: 14px;
		cursor: pointer;
	}
	.btmBox:hover{
		background-color: #F7F7F7;
	}
	.btmBox img{
		width: 16px;
		height: 16px;
	}

	/*站内信滑过框*/
	.infoBox{
		width:280px;
		background-color: white;
		box-shadow:0px 0px 8px 0px rgba(0,0,0,0.12);
		border-radius:4px;
		padding-top: 1px;
		position: absolute;
		left: -100px;
		top: 56px;
		z-index: 65;
	}
	.noticeBox{
		display: inline-block;
		margin-top:24px;
		padding-left: 24px;
		text-align: left;
		display: flex;
		flex-direction: row;
	}
	.noticeTitle{
		width: 145px;
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(81,81,81,1);
		line-height:14px;
		margin-right: 12px;
	}
	.noticeDate{
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(193,193,193,1);
		line-height:12px;
	}
	.view_more{
		padding-top: 16px;
		padding-bottom: 16px;
		margin: 0 auto;
		margin-top: 24px;
		background:rgba(247,247,247,1);
		border-radius:0px 0px 4px 4px;
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:14px;
		cursor: pointer;
	}
	/*投稿划过框*/
	.itemsBox{
		width: 120px;
		padding:16px 0 16px 0;
		background-color: white;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 8px 0px rgba(0,0,0,0.12);
		border-radius:4px;
		position: absolute;
		left: 60px;
		top: 56px;
		z-index: 65;
	}
	.item_{
		padding: 8px;
		padding-left: 24px;
		font-size: 14px;
		display: block;
		text-align: left;
		cursor: pointer;
	}
	.item_:hover{
		background:rgba(73,89,246,0.08);
		color:#4959F6;
	}
</style>