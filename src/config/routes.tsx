import { RouteRecordRaw } from 'vue-router';
// import { defineAsyncComponent } from 'vue'
// const _import = (path:string) => defineAsyncComponent(() => import(`../views/${path}.tsx`))

const _import = (path:string,suffix = 'tsx') => () => import(`../${path}.${suffix}`)

import pig from '../assets/icons/pig.svg';
import clock from '../assets/icons/clock.svg';
import cloud from '../assets/icons/cloud.svg';
import chart from '../assets/icons/chart.svg';
import Welcome from '../views/Welcome';

export const routes:RouteRecordRaw[] = [
  {
    path:'/welcome',
    component: Welcome,
    children:[
      {
        path:'/',
        redirect:'/welcome/1'
      },
      {
        path:'1',
        component: _import('components/welcome'),
        props:{
          next:'/welcome/2',
          icon: pig,
          text:['会挣钱','还要会省钱']
        }
      },
      {
        path:'2',
        component: _import('components/welcome'),
        props:{
          next:'/welcome/3',
          icon: clock,
          text:['每日提醒','不会遗漏每一笔账单']
        }
      },
      {
        path:'3',
        component: _import('components/welcome'),
        props:{
          next:'/welcome/4',
          icon: chart,
          text:['数据可视化','收支一目了然']
        }
      },
      {
        path:'4',
        component: _import('components/welcome'),
        props:{
          next:'',
          icon: cloud,
          text: ['云备份','再也不怕数据丢失']
        }
      },
    ]
  },
  {
    path:'/',
    redirect: '/welcome'
  },
  {
    path:'/start',
    component: _import('views/Start')
  }
]





