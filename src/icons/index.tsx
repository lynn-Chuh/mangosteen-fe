import s from './index.module.scss'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props:{
    icon: {
      type: String,
      required: true
    },
  },
  setup(props){
    const iconName = computed(() => {
      return `#icon-${props.icon}`
    })
    return  ()=> 
      <svg class={[s['svg-icon'],`svg-${props.icon}-icon`]} aria-hidden="true">
        <use xlinkHref={iconName.value} />
      </svg>
  }
})