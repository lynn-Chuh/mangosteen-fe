import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'


export default defineComponent({
  name: 'Welcome',
  render(){
    return <div class={[s.wrapper, 'flex-col','items-center']}>
      <header class='flex-col items-center'>
        <img src={logo} />
        <h1>山竹记账</h1>
      </header>
      <main class="grow-1"><RouterView /></main>
    </div>
  }
})
