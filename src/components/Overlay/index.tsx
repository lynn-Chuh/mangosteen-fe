import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  ref,
  Teleport,
  TeleportProps,
  Transition,
  watch,
} from "vue";
import { callInterceptor, Interceptor } from "../../utils/interceptor";
import { isNumeric } from "../../utils/validate";
import s from "./index.module.scss";


type Position = "top" | "left" | "right" | "bottom";

let globalZIndex = 200;

export default defineComponent({
  name: "Overlay",
  emits:['update:show'],
  props: {
    show: Boolean,
    teleport: [String, Object] as PropType<TeleportProps["to"]>,
    beforeClose: Function as PropType<Interceptor>,
    lockScroll: {
      type:Boolean,
      default: true
    },
    position: {
      type: String as PropType<Position>,
      default: "bottom",
    },
    duration: {
      type:[Number,String],
      default: 0.5

    },
    class: [String, Array],
    width: {
      type: [String,Number],
      default: '150'
    },
    height: {
      type: [String,Number],
      default: '150'
    },
    zIndex:{
      type:[Number,String],
    }
  },
  setup(props, context) {
    const zIndex = ref<number>();

    watch(()=>[props.show,props.zIndex],([p_show,p_zIndex])=>{
      if(p_show){
        if (p_zIndex !== undefined) {
          globalZIndex = +p_zIndex;
        }
        zIndex.value = ++globalZIndex;
      }
    })

    const style = computed(() => {
      const style: CSSProperties = {
        zIndex: zIndex.value
      };
      if (props.duration) {
        style.animationDuration = `${props.duration}s`;
        style.transitionDuration = `${props.duration}s`;
      }
      return style
    });
    let positionStyles = computed(()=>{
      let width = isNumeric(props.width) ? `${props.width}px` : props.width
      let height = isNumeric(props.height) ? `${props.height}px` : props.height
      let customStyles:Record<Position,CSSProperties> = {
        left: {
          height:'100%',
          width,
          top:0,
          left:0
        },
        right:{
          height:'100%',
          width,
          top:0,
          right:0
        },
        top:{
          width:'100%',
          height,
          left:0,
          top:0,
        },
        bottom:{
          width:'100%',
          height,
          left:0,
          bottom: 0
        }
      }  
      return customStyles[props.position]
    })

    const handleClose = () => {
      if (props.show) {
        callInterceptor(props.beforeClose, {
          done() {
            context.emit("update:show", false);
          },
        });
      }
    };
    const renderContent = () => (
      <div
        v-show={props.show}
        style={{...style.value,...positionStyles.value}}
        class={s.content}
      >
        <div class={props.class}>
          {context.slots.default?.()}
        </div>
      </div>
    );

    const preventTouchMove = (event: TouchEvent) => {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }
      event.stopPropagation();
    };

    const renderOverlay = () => (
      <div
        v-show={props.show}
        class={s.overlay}
        style={style.value}
        onClick={handleClose}
        onTouchmove={props.lockScroll ? preventTouchMove : ()=>void 0}
      ></div>
    );

    const transitionClass = computed(() => {
      let leaveName: Record<Position, string> = {
        left: s.left_leave,
        top: s.top_leave,
        right: s.right_leave,
        bottom: s.bottom_leave,
      };
      return leaveName[props.position]
    });
    const Content = () => (
      <Transition
        leaveActiveClass={s.overlay_leave_active}
        enterActiveClass={s.overlay_enter_active}
        enterFromClass={transitionClass.value}
        leaveToClass={transitionClass.value}
        v-slots={{ default: renderContent }}
      ></Transition>
    );
    const Overlay = () => (
      <Transition
        leaveActiveClass={s.overlay_leave_active}
        enterActiveClass={s.overlay_enter_active}
        enterFromClass={s.fade_in}
        leaveToClass={s.fade_in}
        v-slots={{ default: renderOverlay }}
      ></Transition>
    );

    return () =>
      props.teleport ? (
        <Teleport to={props.teleport}>
          <Overlay />
          <Content />
        </Teleport>
      ) : (
        <>
          <Overlay />
          <Content />
        </>
      );
  },
});
