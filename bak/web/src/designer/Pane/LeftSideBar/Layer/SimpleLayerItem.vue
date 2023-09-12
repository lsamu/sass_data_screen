<template>
  <x-icon v-contextmenu.stop="contextmenus" draggable="true" :size="18" :name="name"
    @dragstart="handleDragStart($event, index)" @drop="handleDrop($event, index)"
    @dragover="handleDragOver($event, index, true)" />
</template>

<script lang="ts" setup>
import { eventBus, StaticKey } from '@/bus'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const props = defineProps({
  component: {
    default: null
  },
  index: {
    default: null
  },
  activeKey: {
    default: null
  },
  mode: {
    default: "expand"
  },
  name: {
    default: null
  },
  contextmenus: {
    default: null
  },
})

const emits = defineEmits(["select"])
const basicStore = useBasicStoreWithOut()

const handleDragStart = (event: DragEvent, index) => {
  // event.preventDefault()
  event.dataTransfer?.setData('componentIndex', index)
  event.stopPropagation()
}

const handleDragOver = (event: DragEvent, index: string, isEmit = false) => {
  event.preventDefault()
  event.stopPropagation()
  if (isEmit && index !== props.activeKey) {
    eventBus.emit(StaticKey.ACTIVE_MENU, index)
  }
}

const handleDrop = (event: DragEvent, index) => {
  event.preventDefault()
  event.stopPropagation()
  const componentIndex: string = event.dataTransfer?.getData('componentIndex') as string
  const toIndex: string = calcDragIndex(componentIndex, index)
  const indexes: number[] = componentIndex.split('-').map((i) => Number(i))
  const cutComponent: any = basicStore.getComponentByIndex(indexes)
  const component: any = basicStore.cutComponent(
    indexes[indexes.length - 1],
    cutComponent?.parent
  )
  if (component && toIndex) {
    const toIndexs: number[] = componentIndex.split('-').map((i) => Number(i))
    const insertComponent: any = basicStore.getComponentByIndex(toIndexs)
    basicStore.insertComponent(toIndexs[toIndexs.length - 1], component, insertComponent)
    emits('select', index)
  }
}
const calcDragIndex = (fromIndex: string, toIndex): string => {
  const fromIndexs: number[] = fromIndex.split('-').map((el) => parseInt(el))
  const toIndexs: number[] = toIndex.split('-').map((el) => parseInt(el))
  const fromLength: number = fromIndexs.length
  for (let i = 0; i < fromLength; i++) {
    if (fromIndexs[i] === toIndexs[i]) {
      continue
    } else if (fromIndexs[i] > toIndexs[i]) {
      return toIndex
    } else if (fromIndexs[i] < toIndexs[i]) {
      if (i + 1 == fromLength) {
        toIndexs[i] = toIndexs[i] - 1
        return toIndexs.join('-')
      } else {
        return toIndex
      }
    }
  }
  return toIndex
}
</script>

<style lang="less" scoped>
.iconfont {
  @apply mr-1 text-xl;
}
</style>
