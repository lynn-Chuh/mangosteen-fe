import { defineComponent, PropType } from "vue";
import s from "./index.module.scss";
import Overlay from "../../components/Overlay";
import { callInterceptor, Interceptor } from "../../utils/interceptor";
export default defineComponent({
  props: {
    header: { type: String },
    message: { type: String },
    showAction: { type: Boolean, default: true },
    cancelText: { type: String, default: "取消" },
    confirmText: { type: String, default: "确定" },
    modelValue: { type: Boolean },
    beforeClose: Function as PropType<Interceptor>,
  },
  emits: ["update:modelValue", "confirm", "cancel"],
  setup(props, context) {
    const handleUpdateShow = (
      value: boolean,
      action?: "confirm" | "cancel"
    ) => {
      if (!value) {
        callInterceptor(props.beforeClose, {
          done() {
            action && context.emit(action);
            context.emit("update:modelValue", value);
          },
        });
      } else {
        context.emit("update:modelValue", value);
      }
    };
    const handleCancel = () => {
      handleUpdateShow(false, "cancel");
    };
    const handleConfirm = () => {
      handleUpdateShow(false, "confirm");
    };
    return () => (
      <Overlay
        position="center"
        show={props.modelValue}
        onUpdate:show={handleUpdateShow}
        width="80vw" duration={0.3}
        maxWidth="550px"
      >
        <div class={s.dialog}>
          {props.header ? (
            <div class={s.dialog_header}>{props.header}</div>
          ) : (
            ""
          )}
          <div class={s.dialog_content}>
            {context.slots.default
              ? context.slots.default()
              : props.message || ""}
          </div>
          {props.showAction ? (
            <div class={s.dialog_footer}>
              <span class={s.action} onClick={handleCancel}>
                {props.cancelText}
              </span>
              <span class={s.action} onClick={handleConfirm}>
                {props.confirmText}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </Overlay>
    );
  },
});
