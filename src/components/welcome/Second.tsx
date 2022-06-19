import WelcomeLayout from "./welcomeLayout";
import clock from '../../assets/icons/clock.svg';
import { FunctionalComponent } from "vue";


const C:FunctionalComponent = ()=> <WelcomeLayout icon={clock} text={['每日提醒','不会遗漏每一笔账单']}/>


C.displayName = 'Second'

export default C