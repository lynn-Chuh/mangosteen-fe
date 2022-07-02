import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
export default defineComponent({
  name: "MainLayout",
  props: {
    sidebar: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "山竹记账",
    },
  },
  setup(props, context) {
    const OverlayVisible = ref(false);
    const router = useRouter()
    const onClickMenu = () => {
      if(props.sidebar){
        OverlayVisible.value = true
      }else{
        router.back()
      }
    };
    return () => (
      <>
        <NavBar>
          {{
            icon: () => (
              <svg-icon
                icon={props.sidebar ? "menu" : "back"}
                onClick={onClickMenu}
              />
            ),
            default: () => props.title,
          }}
        </NavBar>
        { context.slots.default?.() }
        { props.sidebar ? <SideBar v-model:show={OverlayVisible.value} /> : void 0 }
      </>
    );
  },
});
