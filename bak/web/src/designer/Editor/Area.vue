<template>
  <div
    v-if="hidden"
    v-contextmenu.stop="contextMenus"
    :style="{
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    }"
    class="area"
  ></div>
</template>

<script setup lang="ts">
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const composeStore = useComposeStoreWithOut()
const basicStore = useBasicStoreWithOut()

const hidden = computed(() => composeStore.hidden)
const left = computed(() => composeStore.style.left)
const top = computed(() => composeStore.style.top)
const width = computed(() => composeStore.style.width)
const height = computed(() => composeStore.style.height)

const stopWatch = watch(
  () => basicStore.curComponent,
  () => {
    if (composeStore.components.length > 0) {
      composeStore.setHidden()
    }
  }
)

const compose = () => {
  composeStore.compose()
  composeStore.setHidden()
}

const handleFlushLeft = () => {
  composeStore.flushLeft()
  composeStore.setHidden()
}

const handleFlushRight = () => {
  composeStore.flushRight()
  composeStore.setHidden()
}

const handleFlushTop = () => {
  composeStore.flushTop()
  composeStore.setHidden()
}
const handleFlushBottom = () => {
  composeStore.flushBottom()
  composeStore.setHidden()
}

const handleFlushRow = () => {
  composeStore.flushRow()
  composeStore.setHidden()
}

const handleFlushColumn = () => {
  composeStore.flushColumn()
  composeStore.setHidden()
}

const batchDelete = () => {
  composeStore.batchDeleteComponent(composeStore.components)
  composeStore.setHidden()
}

const contextMenus = ()=> {
  return [
    {
      text: '组合',
      subText: '',
      disable: !composeStore.canCompose,
      handler: compose
    },
    { divider: true },
    {
      text: '删除',
      subText: 'Ctrl + Delete',
      disable: composeStore.components.length <= 0,
      handler: batchDelete
    },
    { divider: true },
    {
      text: '左对齐',
      subText: '',
      handler: handleFlushLeft
    },
    {
      text: '右对齐',
      subText: '',
      handler: handleFlushRight
    },
    {
      text: '顶对齐',
      subText: '',
      handler: handleFlushTop
    },
    {
      text: '底对齐',
      subText: '',
      handler: handleFlushBottom
    },
    { divider: true },
    {
      text: '水平对齐',
      subText: '',
      handler: handleFlushRow
    },
    {
      text: '垂直对齐',
      subText: '',
      handler: handleFlushColumn
    }
  ]
}

onUnmounted(() => {
  if (stopWatch) {
    stopWatch()
  }
})
</script>

<style lang="less" scoped>
.area {
  @apply border border-solid border-blue-400 absolute;
}
</style>
