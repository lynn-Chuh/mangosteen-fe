import { defineComponent } from "vue";
import { RouterLink, RouteLocationRaw} from "vue-router";
import s from './welcome.module.scss'

export default defineComponent({
  name: 'WelcomeContext',
  props: {
    next: String,
    icon: String,
    text: Array
  },
  setup(props){
    return () => (
      <div class={[s.wrapper,'flex-col','grow-1']}>
        <div class={[s.card,'grow-1','flex-col','justify-center','items-center','text-center']}>
          <img class={s.pig}  src={props.icon} />
            {
            props.text ? 
            (<h2>
              {props.text.map((str)=><div>{str}</div>)}
            </h2>) :
             ''
            }
        </div>
        <div class={[s.actions,'flex-row','justify-center','items-center']}>
          {
            props.next ? 
              <>
                <RouterLink to={props.next as RouteLocationRaw} >下一页</RouterLink>
                <RouterLink to="/start" class="">跳过</RouterLink>
              </>
              :<RouterLink to="/start" >开启应用</RouterLink>

          }
        </div>
      </div>
    )
  }
})
