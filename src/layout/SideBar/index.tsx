import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import Overlay from '../../components/Overlay';
import s from './index.module.scss'
export default defineComponent({
  name: 'SideBar',
  emits:['close','update:show'],
  props:{
    show: {
      type:Boolean,
      default: false
    }
  },
  setup(props,context){
    const handleUpdateShow =(value:boolean)=>{
      context.emit('close',value)
      context.emit('update:show',value)
    }

    const actions = [
      {name:'统计图标',icon:'chart',to:''},
      {name:'导出数据',icon:'export',to:''},
      {name:'记账提醒',icon:'notify',to:''},
    ]

    return ()=> <Overlay show={props.show} onUpdate:show={handleUpdateShow} position="left" width="70vw">
      <section class={s.user}>
        <h2>未登录用户</h2>
        <p>点击这里登陆</p>
      </section>
      <nav>
        <ul class={s.action_list}>
          { ...actions.map((_)=><li key={_.name}>
              <RouterLink to={_.to} class={s.action}  >
                <svg-icon icon={_.icon} class={s.icon}/>
                <span class={s.text}>{_.name}</span>
              </RouterLink>

            </li>
            )
          }
        </ul>
      </nav>
    </Overlay>
  }
})