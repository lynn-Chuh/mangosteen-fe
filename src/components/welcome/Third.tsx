import WelcomeLayout from "./welcomeLayout";
import { FunctionalComponent } from "vue";


const Component:FunctionalComponent = ()=> <WelcomeLayout icon="chart" text={['数据可视化','收支一目了然']}/>

Component.displayName = 'Third'

export default Component
