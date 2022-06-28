import { FunctionalComponent,HTMLAttributes } from "vue";
import s from './index.module.scss'

interface Props extends HTMLAttributes{

}
const Button:FunctionalComponent<Props> = (props, context) => {
  return <button class={s.wrapper}>{context.slots.default?.()}</button>;
}

export default Button