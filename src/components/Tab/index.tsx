import { defineComponent } from 'vue';
import s from './index.module.scss'
export default defineComponent({
  name: 'Tab',
  props:{
    title: String,
    name: String
  },
  setup(props,context){
    return ()=> <div class={s.tab}>
      {context.slots.default?.()}
    </div>
  }
})