import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../api/index'

Vue.use(Router);
import Home from '../components/common/Home.vue'
import Login from '../components/page/Login.vue'
import CustomerScore from '../components/page/CustomerScore.vue'
import ResetPassword from '../components/page/ResetPassword.vue'
import UserManage from '../components/page/UserManage.vue'

let router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      component: Home,
      children: [
        // {
        //   path: '/',
        //   component: resolve => require(['../components/page/Readme.vue'], resolve)
        // },
        // {
        //   path: '/basetable',
        //   component: resolve => require(['../components/page/BaseTable.vue'], resolve)
        // },
        // {
        //   path: '/vuetable',
        //   component: resolve => require(['../components/page/VueTable.vue'], resolve) // vue-datasource组件
        // },
        // {
        //   path: '/baseform',
        //   component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        // },
        // {
        //   path: '/vueeditor',
        //   component: resolve => require(['../components/page/VueEditor.vue'], resolve) // Vue-Quill-Editor组件
        // },
        // {
        //   path: '/markdown',
        //   component: resolve => require(['../components/page/Markdown.vue'], resolve) // Vue-Quill-Editor组件
        // },
        // {
        //   path: '/upload',
        //   component: resolve => require(['../components/page/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
        // },
        // {
        //   path: '/basecharts',
        //   component: resolve => require(['../components/page/BaseCharts.vue'], resolve) // vue-schart组件
        // },
        // {
        //   path: '/drag',
        //   component: resolve => require(['../components/page/DragList.vue'], resolve) // 拖拽列表组件
        // },
        {
          path: '/score',
          component: CustomerScore
        },
        {
          path: '/reset-password',
          component: ResetPassword
        },
        {
          path: '/user-manage',
          component: UserManage
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

router.afterEach((to, from, next) => {
  if (!api.isCurrentUser() && to.path !== '/login'){
    setTimeout(() => {
      router.push({path: '/login'})
    }, 100)
  }
})

export default router
