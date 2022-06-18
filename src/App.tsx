import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import './style/common.scss'

export const App = defineComponent({
  render() {
    return <RouterView />
  },
});
