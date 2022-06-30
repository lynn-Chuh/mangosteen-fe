import { defineComponent } from "vue";
import s from "./index.module.scss";
export default defineComponent({
  name: "NavBar",
  setup(props,context) {
    const {slots:{default: defaultSlot, icon}} = context
    return () => <div class={s.navbar}>
      <div class={s.icon}>
        {icon?.()}
      </div>
      <div class={s.content}>
        {defaultSlot?.()}
      </div>
    </div>;
  },
});
