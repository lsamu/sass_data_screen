<template>
  <n-tabs
    v-if="!iscollapsed"
    v-model:value="activeKey"
    type="line"
    animated
    :bar-width="100"
    justify-content="center"
    @update:value="
      (key) => {
        activeKey = key
      }
    "
  >
    <n-tab-pane name="components" display-directive="show:lazy">
      <template #tab>
        <span>组件</span>
      </template>
      <ComponentList />
    </n-tab-pane>
    <n-tab-pane name="layer" display-directive="show:lazy">
      <template #tab>
        <span>图层</span>
      </template>
      <Layer />
    </n-tab-pane>
  </n-tabs>
  <n-tabs
    v-else
    v-model:value="activeKey"
    type="line"
    animated
    :bar-width="48"
    justify-content="center"
    @update:value="collapsedTabPane"
  >
    <n-tab-pane v-if="activeKey === 'components'" name="components" display-directive="show:lazy">
      <template #tab>
        <x-icon name="components" @click="switchTab('layer')" />
      </template>
      <ComponentList />
    </n-tab-pane>
    <n-tab-pane v-else-if="activeKey === 'layer'" name="layer" display-directive="show:lazy">
      <template #tab>
        <x-icon name="layers" @click="switchTab('components')" />
      </template>
      <Layer />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import ComponentList from './Component/ComponentList.vue'
import Layer from './Layer/Layer.vue'

const activeKey = ref('components')
const emits = defineEmits(["update:iscollapsed"])

defineProps({
  iscollapsed:{
    default:false
  }
})
const collapsedTabPane = (key) => {
  emits('update:iscollapsed', false)
  activeKey.value = key
}

const switchTab = (key) => {
  activeKey.value = key
}
</script>
