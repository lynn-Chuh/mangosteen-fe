import { defineComponent } from "vue";
import { RouterLink, RouteLocationRaw, useRoute } from "vue-router";
import s from "./welcome.module.scss";

export default defineComponent({
  name: 'WelcomeAction',
  props: {
    next: String,
  },
  setup() {
    const route = useRoute()
    return () => (
      <div class={[s.actions, "flex-row", "justify-center", "items-center"]}>
        {route?.meta?.next ? (
          <>
            <RouterLink to={route?.meta?.next as RouteLocationRaw}>下一页</RouterLink>
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
