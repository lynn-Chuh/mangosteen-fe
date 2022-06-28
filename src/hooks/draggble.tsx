import { onMounted, onUnmounted, ref, Ref, nextTick } from "vue";

interface Options {
  defaultLeft?: number;
  defaultTop?: number;
  draggble?: boolean;
  distanceRight: number;
  distanceBottom: number;
}

export default (element: Ref<HTMLElement | undefined>, options?: Options) => {
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;

  const _l = options?.defaultLeft || 10;
  const _t = options?.defaultTop || 10;
  const canClick = ref(false);
  const transition = ref(element.value?.style.transition || 'none');
  const left = ref(0);
  const top = ref(0);
  const $elRect = element.value?.getBoundingClientRect();

  const checkDraggablePosition = () => {
    if (left.value < 0) {
      left.value = _l;
    }
    let width = element.value?.clientWidth || $elRect?.width || 0;
    let height = element.value?.clientHeight || $elRect?.height || 0;

    if (left.value > clientWidth - width - _l) {
      left.value = clientWidth - width - _l;
    }
    if (top.value < 0) {
      top.value = _t;
    }
    if (top.value + height + _t > clientHeight) {
      top.value = clientHeight - height - _t;
    }
  };

  const handleTouchStart = () => {
    canClick.value = false;
    if (element.value) transition.value = 'none';
    console.log('handleTouchStart')
  };
  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault()
    canClick.value = true;
    if (event.targetTouches.length === 1) {
      // 单指拖动
      let touch = event.targetTouches[0];
      left.value = touch.clientX - ($elRect?.width || 0) / 2;
      top.value = touch.clientY - ($elRect?.height || 0) / 2;
    }
    console.log('handleTouchMove')
  };

  const handleTouchEnd = () => {
    if (!canClick.value) return; // 解决点击事件和touch事件冲突的问题
    if (element.value) transition.value = "all 0.3s";
    checkDraggablePosition();
    console.log('handleTouchEnd')
  };

  const handleMouseMove = (event:MouseEvent)=>{
    let w = ($elRect?.width || 0)/2
    let h = ($elRect?.height || 0)/2

    left.value = event.clientX - w
    top.value = event.clientY - h
  }

  const handleMouseDown =(event:MouseEvent)=>{
    canClick.value = false
    transition.value = 'none'
    document.addEventListener('mousemove',handleMouseMove,false)
  }

  const handleMouseUp =()=>{
     document.removeEventListener('mousemove',handleMouseMove,false)
     checkDraggablePosition()
     transition.value = "all 0.3s"
  }


  onMounted(() => {
    nextTick(() => {
      left.value = clientWidth - ($elRect?.width || 0) - (options?.distanceRight || 0);
      top.value = clientHeight - ($elRect?.height || 0) - (options?.distanceBottom || 0);
      if(!options?.draggble ) return
      element.value?.addEventListener("touchstart", handleTouchStart,false);
      element.value?.addEventListener("touchmove", handleTouchMove,false);
      element.value?.addEventListener("touchend", handleTouchEnd,false);
      element.value?.addEventListener("mouseup", handleMouseUp,false);
      element.value?.addEventListener("mousedown",handleMouseDown,false);
    });
  });
  onUnmounted(() => {
    element.value?.removeEventListener("touchstart", handleTouchStart);
    element.value?.removeEventListener("touchmove", handleTouchMove);
    element.value?.removeEventListener("touchend", handleTouchEnd);
    element.value?.removeEventListener("mouseup", handleMouseUp);
    element.value?.removeEventListener("mousedown",handleMouseDown);
  });

  return {
    left,
    top,
    transition
  };
};
