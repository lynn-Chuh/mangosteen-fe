import { RouteRecordRaw } from 'vue-router';
// import { defineAsyncComponent } from 'vue'
// const _import = (path:string) => defineAsyncComponent(() => import(`../views/${path}.tsx`))

const _import = (path:string) => () => import(`../views/${path}.tsx`)

export const routes:RouteRecordRaw[] = [
  {
    path:'/welcome',
    component: _import('Welcome'),
  },
  {
    path:'/',
    component:  _import('Home')
  }
]





