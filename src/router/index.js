import Vue from 'vue'
import Router from 'vue-router' 
//一级路由板块
import home from '../components/home'
import photo from '../components/photo'
import detail from '../components/detail'
import search from '../components/search'
import articles from '../components/articles'
import contribute from '../components/contribute/preview'
import mail from '../components/mail/mail'
import about from '../components/about'

// 个人中心
import personalHome from '../components/personalCenter/home'
import focusfans from '../components/personalCenter/focusfan'
// 投稿
import newArticle from '../components/contribute/newArticle'
import newPhotograph from '../components/contribute/newPhotograph'
import newWork from '../components/contribute/newWork'
import preview from '../components/contribute/preview'

//站内信子路由
import allMail from '../components/mail/children/all'
import commentMail from '../components/mail/children/comment'
import noticeMail from '../components/mail/children/notice'

//文字说明子路由
import protocol from '../components/about/protocol'
import rubric from '../components/about/rubric'
import tipoff from '../components/about/tipoff'
import tips from '../components/about/tips'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/articles',
      name: 'articles',
      component: articles
    },
    {
      path: '/photo',
      name: 'photo',
      component: photo
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      children:[
        {path:'protocol',name:'protocol',component:protocol},
        {path:'rubric',name:'rubric',component:rubric},
        {path:'tipoff',name:'tipoff',component:tipoff},
        {path:'tips',name:'tips',component:tips},
        {path:'/about',redirect:'/about/rubric'}
      ]
    },
    {
      path: '/mail',
      name: 'mail',
      component: mail,
      children:[
      	{path:'all',name:'allMail',component:allMail},
      	{path:'comment',name:'commentMail',component:commentMail},
      	{path:'notice',name:'noticeMail',component:noticeMail}
      ]
    },
    {
      path: '/newArticle',
      name: 'newArticle',
      component: newArticle
    },{
      path: '/newPhotograph',
      name: 'newPhotograph',
      component: newPhotograph
    },{
      path: '/newWork',
      name: 'newWork',
      component: newWork
    },{
      path: '/preview',
      name: 'preview',
      component: preview
    },{
      path: '/personalHome',
      name: 'personalHome',
      component: personalHome
    },{
      path: '/personalHome/focusfans',
      name: 'focusfans',
      component: focusfans
    }
  ]
})
