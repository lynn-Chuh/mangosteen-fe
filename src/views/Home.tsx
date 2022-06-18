import { defineComponent, ref } from "vue";

const setRef:(initVal:any)=>[any,(value:any)=>void] = (initVal)=>{
  let _ref = ref(initVal)
  const setRef = (value:any)=>{
    _ref.value = value
  }
  return [_ref,setRef]
}

export default defineComponent({
  name: 'Home',
  setup(){
    let [countRef,setCountRef] = setRef(666)
    return ()=> <>
      <div>{countRef.value}</div>
      <button onClick={()=>setCountRef(countRef.value + 1)}>+1</button>
    </>
  }
})
