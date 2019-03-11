import Vue from 'vue'
import Vuex from 'vuex'
import {setCookie,getCookie,delCookie} from '../cookie/cookie'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		userData:'',
		token:'',
		isLogin:true,//登录状态
		outcomeList:'',//搜索结果
		total:0,//搜索页数
		searchVal:'',//搜索值
		sortNum:'visits',
		typeNum:'',
	},
	mutations:{
		clearData(state){
			state.isLogin=false
			state.token=null
			state.userData=null
		},
		login(state,{token,userData}){
			state.token=token
			state.isLogin=true
			state.userData=userData
		},
		total(state,total){
			state.total=total
		},
		searchList(state,searchList){
			state.outcomeList=searchList
		},
		searchVal(state,val){
			state.searchVal=val
		},
		type(state,idx){
			state.typeNum=idx
		},
		sort(state,idx){
			state.sortNum=idx
		},
	},
	actions:{//{commit}传递参数
		exit({commit}){
			commit("clearData")
			delCookie('token')
			delCookie('userData');
		},
		login({commit},{token,userData}){
			setCookie('userData',JSON.stringify(userData))
			setCookie('token',token)
			commit('login',{token,userData})
		},
		total({commit},total){
			commit('total',total)
		},
		search({commit},list){
			commit('searchList',list)
		},
		searchVal({commit},val){
			commit('searchVal',val)
		},
		typeChoose({commit},idx){
			commit('type',idx)
		},
		sortChoose({commit},idx){
			commit('sort',idx)
		},
	},
	getters:{
        getuserData:(state)=>{
            return state.userData;
        }
    }
})