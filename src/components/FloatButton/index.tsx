import { computed, defineComponent,onMounted,onUnmounted,ref } from "vue";
import draggble from "../../hooks/draggble";
import s from './index.module.scss'


export default defineComponent({
  props:{
    icon: {
      type:String,
      required: true
    },
    draggable:{
      type: Boolean,
      default: false
    },
    right:{
      type:Number,
      default: 60
    },
    bottom:{
      type:Number,
      default: 100
    },
    zIndex:{
      type:Number,
      default: 100
    }
  },
  setup(props,context){
    const $el=ref<HTMLElement>()
    const {left,top,transition} = draggble($el,{
      draggble: props.draggable,
      distanceBottom: props.bottom,
      distanceRight: props.right,
    })
    const style = computed(()=>({
      left: left.value + 'px',
      top: top.value + 'px',
      zIndex: props.zIndex,
      transition: transition.value
    }))
    return ()=><div 
      ref={$el} style={style.value} 
      class={s.wrapper}
      >
       <svg-icon class={s.icon} icon={props.icon}/>
    </div>
  }
})