import { RouteRecordRaw } from 'vue-router';
import Welcome from '../views/Welcome';
import Frist from '../components/welcome/Frist';
import Second from '../components/welcome/Second';
import Third from '../components/welcome/Third';
import Forth from '../components/welcome/Forth';


declare module 'vue-router' {
  interface RouteMeta {
    next?: string
    from?: string
  }
}
const _import = (path:string,suffix = 'tsx') => () => import(`../${path}.${suffix}`)

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
        components: {
          main: Frist,
          footer: _import('components/welcome/welcomeActions')
        },
        meta:{next:'/welcome/2',from:''},
        props:{
          footer:{
            next:'/welcome/2',            
          }
          
        }
      },
      {
        path:'2',
        components: {
          main: Second,
          footer: _import('components/welcome/welcomeActions')
        },
        meta:{next:'/welcome/3',from:'/welcome/1'},
        props:{
          footer:{
            next:'/welcome/3',         
          }
        }
      },
      {
        path:'3',
        components: {
          main: Third,
          footer: _import('components/welcome/welcomeActions')
        },
        meta:{next:'/welcome/4',from:'/welcome/2'},
        props:{
          footer:{
            next:'/welcome/4',         
          }
        }
      },
      {
        path:'4',
        components:{
          main: Forth,
          footer: _import('components/welcome/welcomeActions')  
        },
        meta:{next:'',from:'/welcome/3'},
        props:{
          footer:{
            next:'',         
          }
        },   
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





