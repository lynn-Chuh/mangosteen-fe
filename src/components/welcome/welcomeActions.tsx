import { defineComponent } from "vue";
import { RouterLink, RouteLocationRaw } from "vue-router";
import s from "./welcome.module.scss";

export default defineComponent({
  name: 'WelcomeAction',
  props: {
    next: String,
  },
  setup(props) {
    return () => (
      <div class={[s.actions, "flex-row", "justify-center", "items-center"]}>
        {props.next ? (
          <>
            <RouterLink to={props.next as RouteLocationRaw}>下一页</RouterLink>
            <RouterLink to="/start" class="">
              跳过
            </RouterLink>
          </>
        ) : (
          <RouterLink to="/start">开启应用</RouterLink>
        )}
      </div>
    );
  },
});
