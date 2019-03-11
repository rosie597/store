<template>
	<div class="login_bar">
    			<div class="tab_bar">
    				<div :class="tab_=='tab1'?'tab_active':'tab'" @click='tab1'>
    					<span>登录</span>
    				</div>
    				<div :class="tab_=='tab2'?'tab_active':'tab'" @click='tab2'>
    					<span>注册</span>
    				</div>
    				<img src="../../static/imgs/cancel.png" class="cancel_icon" @click="cancelShow"/>
    			</div>
    			<div class="form_bar">
    				<!-- 登陆表单 -->
    				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="form" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中..." v-if='status' key='form1'>
					  <el-form-item prop="account">
					    <el-input type="text" v-model="ruleForm.account" autocomplete="on" placeholder='请输入账号' class='loginIpt'></el-input>
					  </el-form-item>
					  <el-form-item prop="password">
					    <el-input :type="passVisible1?'text':'password'" v-model="ruleForm.password" autocomplete="on" placeholder='请输入密码'  class='loginIpt' @keyup.enter.native="submitForm('ruleForm')"></el-input>
					    <img :src="passVisible1?eyeImgs[1]:eyeImgs[0]" class='eyeImg'
					    @click='eye(1)'>
					  </el-form-item>
					  <el-form-item>
					    <el-button class='loginIpt' type="primary" @click="submitForm('ruleForm')">登陆</el-button>
					  </el-form-item>
					</el-form>
    				<!-- 注册表单 -->
    				<el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2"  class="form" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中..." v-if='!status' key='form2'>
					  <el-form-item prop="account">
					    <el-input type="text" v-model="ruleForm2.account" autocomplete="on" placeholder='请输入账号' class='loginIpt'></el-input>
					  </el-form-item>
					  <el-form-item prop="password">
					    <el-input :type="passVisible1?'text':'password'" v-model="ruleForm2.password" autocomplete="on" placeholder='请输入密码'  class='loginIpt'></el-input>
					    <img :src="passVisible1?eyeImgs[1]:eyeImgs[0]" class='eyeImg'
					    @click='eye(1)'>
					  </el-form-item>
					  <el-form-item prop="checkpass">
					    <el-input :type="passVisible2?'text':'password'" v-model="ruleForm2.checkpass" autocomplete="off" placeholder='请再次输入密码'  class='loginIpt' @keyup.enter.native="submitForm('ruleForm2')"></el-input>
					    <img :src="passVisible2?eyeImgs[1]:eyeImgs[0]" class='eyeImg'
					    @click='eye(2)'>
					  </el-form-item>
					  <el-form-item>
					    <el-button class='loginIpt' type="primary" @click="submitForm('ruleForm2')">注册</el-button>
					  </el-form-item>
					</el-form>
    			</div>
    			<div class="icon_bar">
    				<img :src="wechatOn?loginImgs[1]:loginImgs[0]" 
    				@mouseover="hoverFn(0)"  @mouseout="hoverFn(1)" style="cursor: pointer;">
    				<img :src="qqOn?loginImgs[3]:loginImgs[2]" @mouseover="hoverFn(2)" @mouseout="hoverFn(3)"style="cursor: pointer;">
    			</div>
    		</div>
</template>
<script>
	export default{
		name:'loginBar',
		props:{
			tab:{
				type:String,
				required:true
			}
		},
		data(){
			var validatePass1 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          callback();
		        }
	     	};
	     	var validateAccount1=(rule,value,callback)=>{
	     		if(value===''){
	     			callback(new Error('请输入账号'))
	     		}else{
	     			callback();
	     		}
	     	};
	     	var validateAccount2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入账号'));
		        } else {
		        	if(!((/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(value))||(/^1[34578]\d{9}$/.test(value)))){
		        		callback(new Error('手机号或邮箱地址有误'));
		        	}
		          callback();
		        }
	     	};

	     	var validateCheckpass = (rule, value, callback) => {
	     		if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm2.password) {
		          callback(new Error('两次密码不一致'));
		        } else {
		          callback();
		        }
	     	};
			return{
				bodyHeight:0,
				bodyWidth:0,
				fullscreenLoading:false,
				tab_:'tab1',
				wechatOn:false,
				qqOn:false,
				isLgShow:true,
				status:true,//true为登陆,false为注册
				ruleForm:{
					account:'',
		          	password: '',
		        },
		        rules:{
					password:[{validator:validatePass1,trigger:'blur'}],
		        	account:[{validator:validateAccount1,trigger:'blur'}],
		        },
				ruleForm2: {
					account:'',
		          	password: '',
		          	checkpass:'',
		        },
		        rules2:{
		        	password:[{validator:validatePass1,trigger:'blur'}],
		        	account:[{validator:validateAccount2,trigger:'blur'}],
		        	checkpass:[{validator:validateCheckpass,trigger:'blur'}],
		        },
		        loginImg:'',
		        loginImgs:[
		        	'../../static/imgs/wechat.png',
		        	'../../static/imgs/wechat_on.png',
		        	'../../static/imgs/qq.png',
		        	'../../static/imgs/qq_on.png',
		        ],
		        eyeImgs:['../../static/imgs/unsee.png','../../static/imgs/cansee.png'],
		        passVisible1:false,
		        passVisible2:false
			}
		},
		methods:{
			hoverFn(idx){
      			switch(idx){
      				case 0:{this.wechatOn=true}break;
      				case 1:{this.wechatOn=false}break;
      				case 2:{this.qqOn=true}break;
      				case 3:{this.qqOn=false}break;
      			}
      		},
      		//获取个人信息
      		selfReq(){
      			if(token){
      				var userId=this.$store.state.userData.id
      				this.$axios({
      					method:'get',
      					url:this.domainName+'/profile/userId='+userId,
      				}).then((res)=>{
      					this.$store.dispatch('userInfo',res.data.data)
      				}).catch((err)=>{
      					console.log(err)
      				})
      			}
      		},
      		//提交表单
			submitForm(form) {
				var that=this;
		        that.$refs[form].validate((valid) => {
		          if (valid) {
		          	if(that.status){
		          		//登陆
		          		that.loginReq(that.ruleForm)
		          	}else{
		          		//注册
		          		that.registFn(that.ruleForm2)
		          	}	
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
      		},
      		//登录请求
      		loginReq(res){
      			return new Promise((resolve,reject)=>{
      				this.fullscreenLoading = true;
        		this.$axios({
        			method:'post',
        			url:this.domainName+'/user/login',
        			data:{
        				'loginName':res.account,
        				'password':res.password
        			}
        		}).then((res)=>{
        			if(res.data.code==20000){
        				this.$message({
				           message: '登陆成功',
				           type: 'success'
				        });
				        this.cancelShow()//关闭登陆框
				        let token=res.data.data.token;
				        let userData=res.data.data.user
				        this.$store.dispatch('login',{token,userData})
				        this.$emit('listenSuccess')
				        resolve()
        			}else{
        				this.$message.error('登陆失败，请重新登陆');
        				reject()
        			}
        			this.fullscreenLoading = false;
        		}).catch((err)=>{
        			reject()
        			console.log(err)
        			this.$message.error('网络错误');
        			this.fullscreenLoading = false;
        		})
      			})
      		},
      		//注册请求
      		registFn(res){
      			var data={}
      			if(/^1[34578]\d{9}$/.test(res.account)){
      				data={
        				'mobile':res.account,
        				'password':res.password
        			}
      			}else{
      				data={
        				'email':res.account,
        				'password':res.password
        			}
      			}
      			this.fullscreenLoading = true;
        		this.$axios({
        			method:'post',
        			url:this.domainName+'/user/regist',
        			data:data
        		}).then((res)=>{
        			if(res.data.code==20000){
        				this.$message({
				          message: '注册成功',
				          type: 'success'
				        });
				        this.tab_='tab1'
				        this.status=true
        			}else{
        				this.$message.error('注册失败');
        			}
        			this.fullscreenLoading = false;
        		}).catch((err)=>{
        			console.log(err)
        			this.$message.error('网络错误');
        			this.fullscreenLoading = false;
        		})
      		},
      		cancelShow(){
				this.isLgShow=false
				$('body').css('overflow','auto');
				this.$emit('listenClose',this.isLgShow)
			},
			tab1(){
				this.tab_='tab1'
				this.status=true
			},
			tab2(){
				this.tab_='tab2'
				this.status=false
			},
			eye(idx){
				switch(idx){
					case 1:{
						this.passVisible1=!this.passVisible1
					}break;
					case 2:{
						this.passVisible2=!this.passVisible2
					}break;
				}
			}
		},
		mounted(){
			this.tab_=this.tab
			this.status=this.tab_=='tab1'?true:false
		}
	}
</script>
<style scoped>
		.login_bar{
		width: 30%;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.tab_bar{
		width: 100%;
		height: 64px;
		position: relative;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		margin-bottom: 28px;
		cursor: pointer;
	}
	.form_bar{
		width: 62%;
	}
	.icon_bar{
		width: 60%;
		height: 120px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.cancel_icon{
		width: 16px;
		height: 16px;
		position: absolute;
		top: 24px;
		right: 24px;
	}
	.tab_active{
		width: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 4px solid #4959F6;
		color:#4959F6;
		padding-bottom: 10px;
	}
	.tab{
		width: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 4px solid #F6F6F6;
		padding-bottom: 10px;
	}
	.loginIpt{
		width:100%;
		height: 40px;
		position: relative;
	}
	.eyeImg{
		width: 16px;
		height: 16px;
		position: absolute;
		top: 12px;
		left: 88%;
	}
	
	.el-input__icon:before{
		opacity: 0;
	}
</style>