import WelcomeLayout from "./welcomeLayout";
import { FunctionalComponent } from "vue";


const Component:FunctionalComponent = ()=> <WelcomeLayout icon="pig" text={['会挣钱','还要会省钱']}/>


Component.displayName = 'Frist'

export default Component