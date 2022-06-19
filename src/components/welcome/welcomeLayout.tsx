import { defineComponent } from "vue";
import s from './welcome.module.scss'

export default defineComponent({
  name: 'WelcomeContext',
  props: {
    icon: String,
    text: Array
  },
  setup(props){
    return () => (
      <div class={[s.wrapper,'flex-col','grow-1']}>
        <div class={[s.card,'grow-1','flex-col','justify-center','items-center','text-center']}>
          <img src={props.icon} />
            {
            props.text ? 
            (<h2>
              {props.text.map((str)=><div>{str}</div>)}
            </h2>) :
             ''
            }
        </div>
      </div>
    )
  }
})
