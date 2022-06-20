import s from './index.module.scss'
import { defineComponent } from 'vue'

export default defineComponent({
  props:{
    icon: {
      type: String,
      required: true
    },
  },
  setup(props){
    return  ()=> 
      <svg class={[s['svg-icon'],`svg-${props.icon}-icon`]} aria-hidden="true">
        <use xlinkHref={`#icon-${props.icon}`} />
      </svg>
  }
})