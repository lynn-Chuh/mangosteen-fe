import { defineComponent } from "vue";

export default defineComponent({
  name: 'Start',
  setup(){
    return ()=> <>
      <div>
        <svg-icon icon="chart"/>
      </div>
    </>
  }
})
