import Vue from 'vue'
import Router from 'vue-router'
import * as api from '../api/index'

Vue.use(Router);

let router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [{
          path: '/',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        {
          path: '/basetable',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve)
        },
        {
          path: '/vuetable',
          component: resolve => require(['../components/page/VueTable.vue'], resolve) // vue-datasource组件
        },
        {
          path: '/baseform',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        },
        {
          path: '/vueeditor',
          component: resolve => require(['../components/page/VueEditor.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
          path: '/markdown',
          component: resolve => require(['../components/page/Markdown.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
        },
        {
          path: '/basecharts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve) // vue-schart组件
        },
        {
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve) // 拖拽列表组件
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/score',
      component: resolve => require(['../components/page/customer-score/CustomerScore.vue'], resolve)
    }
  ]
})

router.afterEach((to, from, next) => {
  if (!api.isCurrentUser() && to.path !== '/login'){
    setTimeout(() => {
      router.push({path: '/login'})
    }, 1000)
  }
})

export default router