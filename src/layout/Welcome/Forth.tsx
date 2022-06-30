import WelcomeLayout from "./welcomeLayout";
import { FunctionalComponent } from "vue";


const  Component:FunctionalComponent =()=> <WelcomeLayout icon="cloud" text={['云备份','再也不怕数据丢失']}/>

Component.displayName = 'Forth'

export default Component
