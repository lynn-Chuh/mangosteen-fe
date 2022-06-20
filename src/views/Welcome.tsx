import { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw, RouterView } from "vue-router";
import s from './Welcome.module.scss'
import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";


const routeActionRef = ref({
  enter: s.slide_fade_enter_from,
  leave: s.slide_fade_leave_to
})

const Welcome = {
  name: 'Welcome',
  beforeRouteUpdate(to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext){
    const _t = parseFloat(to.path.slice(-1))
    const _f = parseFloat(from.path.slice(-1))
    if(!isNaN(_t)&& !isNaN(_f)){
      _t<_f ?// 后退
        routeActionRef.value = {
          leave: s.slide_fade_enter_from,
          enter: s.slide_fade_leave_to
        } :
        routeActionRef.value = {
          enter: s.slide_fade_enter_from,
          leave: s.slide_fade_leave_to
        }
    }
    next()
  },
  setup(){
    return ()=> <div class={[s.wrapper, 'flex-col','items-center']}>
      <header class='flex-col items-center'>
        <svg-icon class={s.icon} icon="mangosteen"/>
        <h1>山竹记账</h1>
      </header>
      <main class="grow-1">
        <RouterView name="main">
          {
            ({Component:C,route:R}:{Component: VNode,route: RouteLocationNormalizedLoaded }) =>
            <Transition  
              enterFromClass={routeActionRef.value.enter} enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={routeActionRef.value.leave} leaveActiveClass={s.slide_fade_leave_active}
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
// console.log(Welcome)

export default Welcome