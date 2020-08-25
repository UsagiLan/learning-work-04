import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HomeComponents/Home.vue'
import Index from './components/HomeComponents/Index.vue'
import editLetter from './components/IndexComponents/editLetter.vue'
import Inbox from './components/IndexComponents/Inbox.vue'
import Sendbox from './components/IndexComponents/Sendbox.vue'
import Deletebox from './components/IndexComponents/Deletebox.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      redirect:'/inbox',
      children:[
      {
        path:'/sendbox',
        name:'sendbox',
        component:Sendbox
      },
      {
        path:'/editLetter',
        name:'editLetter',
        component:editLetter
      },
      {
        path:'/deletebox',
        name:'deletebox',
        component:Deletebox
      },
      {
        path:'/inbox',
        name:"inbox",
        component:Inbox
      }
    ]
  }
  ]
})
