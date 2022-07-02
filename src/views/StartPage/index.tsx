import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import Button from "../../components/Button";
import Center from "../../components/Center";
import FloatButton from "../../components/FloatButton";
import MainLayout from "../../layout/MainLayout";
import s from "./index.module.scss";
export default defineComponent({
  name: "StartPage",
  setup() {
    return () => (
      <MainLayout sidebar>
        <Center class={s.icon_wrapper}>
          <svg-icon icon="pig" class={s.icon} />
        </Center>
        <div class={s.button_wrapper}>
          <RouterLink to="/items">
            <Button class={s.button}>开始记账</Button>
          </RouterLink>
        </div>
        <FloatButton icon="add" draggable />
      </MainLayout>
    );
  },
});
