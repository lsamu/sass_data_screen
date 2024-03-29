<template>
  <div v-contextmenu.stop="contextmenus" draggable="true" @dragstart="handleDragStart($event, index)"
    @drop="handleDrop($event, index)" @dragover="handleDragOver($event, index, true)">
    <div v-if="component.component === 'Group'" class="layer">
      <span v-show="mode === 'expand'">{{ component.name || '分组' }}</span>
      <x-icon :name="toggleIcon(component.display)" :size="18" />
    </div>
    <div v-else class="layer">
      <span v-show="mode === 'expand'">{{ component.name }}</span>
      <x-icon :name="toggleIcon(component.display)" :size="18" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { eventBus, StaticKey } from '@/bus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { cloneDeep } from 'lodash-es'
import { diffIndex } from '@/utils/utils'

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
  contextmenus: {
    default: null
  },
})

const emits = defineEmits(["select"])
const basicStore = useBasicStoreWithOut()

const toggleIcon = (isDisplay: boolean) => (isDisplay ? 'previewOpen' : 'previewClose')

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

const handleDrop = (event: DragEvent, toIndex) => {
  event.preventDefault()
  event.stopPropagation()
  const fromIndex: string = event.dataTransfer?.getData('componentIndex') as string
  const isDragAble = diffIndex(fromIndex, toIndex)
  if (!isDragAble) return
  const indexes: number[] = fromIndex.split('-').map((i) => Number(i))
  const cutComponent: any = basicStore.getComponentByIndex(indexes)
  const inComponent = cloneDeep(cutComponent)
  const toIndexs: number[] = toIndex.split('-').map((i) => Number(i))
  const toComponent: any = basicStore.getComponentByIndex(toIndexs)

  if (inComponent && toComponent && toIndex) {
    const toComponentId: string = toComponent.id
    basicStore.cutComponent(indexes[indexes.length - 1], cutComponent?.parent)
    const parent = toComponent.parent || undefined
    const data = parent ? parent.subComponents : basicStore.componentData
    const newToIndex = data.findIndex((el) => el.id === toComponentId)
    basicStore.insertComponent(newToIndex!, inComponent!, parent)
    emits('select', toIndex)
  }
}
</script>

<style lang="less" scoped>
.layer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}
</style>
