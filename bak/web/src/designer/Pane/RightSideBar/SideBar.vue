<template>
  <div v-if="!iscollapsed">
    <n-tabs
      v-if="curComponent"
      v-model:value="activeKey"
      type="line"
      animated
      justify-content="center"
      @update:value="
        (key) => {
          activeKey = key
        }
      "
    >
      <n-tab-pane name="style" display-directive="show:lazy">
        <template #tab>
          <span v-show="!iscollapsed">样式</span>
        </template>
        <StyleList :curComponent="curComponent!" />
      </n-tab-pane>
      <n-tab-pane name="attr" display-directive="show:lazy">
        <template #tab>
          <span v-show="!iscollapsed">属性</span>
        </template>
        <AttrList :curComponent="curComponent!" />
      </n-tab-pane>
      <n-tab-pane name="data" display-directive="show:lazy">
        <template #tab>
          <span v-show="!iscollapsed">数据</span>
        </template>
        <DataList :curComponent="curComponent!" />
      </n-tab-pane>
    </n-tabs>
    <n-tabs v-else type="line" animated justify-content="center">
      <n-tab-pane name="canvas" display-directive="show:lazy">
        <template #tab>
          <span v-show="!iscollapsed">画布</span>
        </template>
        <Canvas />
      </n-tab-pane>
    </n-tabs>
  </div>
  <div v-else>
    <n-menu :options="menuOptions" />
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import Canvas from './Canvas.vue'
import StyleList from './StyleModule' // 右侧属性列表
import AttrList from './AttrModule'
import DataList from './DataModule'
import { XIcon } from '@/plugins/xicon'

const activeKey = ref('attr')

const basicStore = useBasicStoreWithOut()

defineProps({
  iscollapsed:{
    default:false
  }
})

const emits = defineEmits(["update:iscollapsed"])

const curComponent = computed(() => basicStore.curComponent)
const menuOptions = computed(() => {
  if (basicStore.curComponent) {
    return [
      {
        label: '样式',
        key: '4',
        icon: () =>
          h(XIcon, {
            name: 'textStyle',
            onClick: () => collapsedTabPane('style')
          })
      },
      {
        label: '属性',
        key: '2',
        icon: () =>
          h(XIcon, {
            name: 'attr',
            onClick: () => collapsedTabPane('attr')
          })
      },
      {
        label: '数据',
        key: '3',
        icon: () =>
          h(XIcon, {
            name: 'data',
            onClick: () => collapsedTabPane('data')
          })
      }
    ]
  } else {
    return [
      {
        label: '画布',
        key: '1',
        icon: () =>
          h(XIcon, {
            name: 'page'
          })
      }
    ]
  }
})

const collapsedTabPane = (key) => {
  emits('update:iscollapsed', false)
  activeKey.value = key
}
</script>

<style lang="less" scoped></style>
