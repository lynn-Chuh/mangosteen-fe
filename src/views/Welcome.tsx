import { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded, RouterView } from "vue-router";
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
import { ref, Transition, VNode } from "vue";


const routeActionRef = ref(0) // 0 未设置，1前进 -1后退 
export default {
  name: 'Welcome',
  render(){
    return <div class={[s.wrapper, 'flex-col','items-center']}>
      <header class='flex-col items-center'>
        <img src={logo} />
        <h1>山竹记账</h1>
      </header>
      <main class="grow-1">
        <RouterView name="main">
          {
            ({Component:C,route:R}:{Component: VNode,route: RouteLocationNormalizedLoaded }) =>
            <Transition 
              enterFromClass={s.slide_fade_enter_from} enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to} leaveActiveClass={s.slide_fade_leave_active}
            >
              {C}
            </Transition>
          }
        </RouterView>
        </main>
      <footer><RouterView name="footer"/></footer>
    </div>
  }
}
