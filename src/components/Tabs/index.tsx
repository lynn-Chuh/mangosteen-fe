import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import s from "./index.module.scss";
import Tab from "../Tab";
export default defineComponent({
  name: "Tabs",
  props: {
    value: [String, Number],
  },
  setup(props, context) {
    let indicatorClassName = s.tabs_nav_indicator;
    const elRef = ref<HTMLElement>();
    const indicatorRef = ref<HTMLElement>();
    const indicatorPosition = ref({
      top: "0",
      left: "0",
      width: "0",
    });
    const seekIndicatorPosition = () => {
      let selected = elRef.value?.querySelectorAll('[data-select="true"]');
      if (selected?.length && indicatorRef.value) {
        const sRect = selected[0].getBoundingClientRect();
        const iRect = indicatorRef.value.getBoundingClientRect();
        indicatorPosition.value.top = `${(sRect.height - iRect.height).toFixed(
          2
        )}px`;
        indicatorPosition.value.left = `${sRect.x.toFixed(2)}px`;
        indicatorPosition.value.width = `${sRect.width.toFixed(2)}px`;
      }
    };
    watch(
      () => props.value,
      () => {
        nextTick(() => {
          seekIndicatorPosition();
        });
      }
    );
    onMounted(() => {
      seekIndicatorPosition();
    });

    return () => {
      const children = context.slots.default?.() || [];
      if (!props.value && children.length && children[0].props?.name) {
        context.emit("update:value", children[0].props.name);
      }
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.type !== Tab) {
          throw new Error("<Tabs> only accept <Tab> as Children");
        }
      }
      return (
        <div class={s.tabs}>
          <ol class={s.tabs_nav} ref={elRef}>
            {children.map((child) => (
              <li
                class={[
                  s.tabs_nav_item,
                  child.props?.name === props.value ? s.selected : void 0,
                ]}
                data-select={child.props?.name === props.value}
                onClick={() => context.emit("update:value", child.props?.name)}
              >
                {child.props?.title}
              </li>
            ))}
          </ol>
          <div
            ref={indicatorRef}
            class={indicatorClassName}
            style={indicatorPosition.value}
          />
            {children.find((child) => child.props?.name === props.value)}
        </div>
      );
    };
  },
});
