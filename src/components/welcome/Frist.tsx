import WelcomeLayout from "./welcomeLayout";
import pig from '../../assets/icons/pig.svg';
import { FunctionalComponent } from "vue";


const Component:FunctionalComponent = ()=> <WelcomeLayout icon={pig} text={['会挣钱','还要会省钱']}/>


Component.displayName = 'Frist'

export default Component