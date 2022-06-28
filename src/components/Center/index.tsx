import { defineComponent,PropType } from "vue";
import s from "./index.module.scss";
export default defineComponent({
  name: "Center",
  props:{
    direction:{
      type: String as PropType<'horizontal'|'vertical'>,
      default: 'horizontal'
    }
  },
  setup(props,context) {
    return () => <div class={[s.wrapper,props.direction]}>{
      context.slots.default?.()
    }</div>
  },
});
