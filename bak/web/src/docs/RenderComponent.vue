<template>
  <n-card v-if="mode === 'debug'" :title="title" style="margin-bottom: 16px; height: 100%">
    <n-tabs type="line" animated>
      <n-tab-pane name="oasis" tab="效果" display-directive="show">
        <Render />
      </n-tab-pane>
      <n-tab-pane name="attr" tab="属性" display-directive="show">
        <StaticDataView v-model:content="form.propValue" class="content" mode="debug" height="300px"
          @update:content="propValueChange" />
      </n-tab-pane>
      <n-tab-pane name="style" tab="样式" display-directive="show">
        <StaticDataView v-model:content="form.style" class="content" mode="debug" height="300px"
          @update:content="styleChange" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
  <n-card v-else :title="title" style="margin-bottom: 16px; height: 100%">
    <Render />
  </n-card>
</template>
<script setup lang="ts">
import { getComponentStyle } from '@/utils/utils'
import { uuid } from '@/utils/utils'
import StaticDataView from '@/components/StaticDataView'

const props = defineProps({
  config: {
    default: null
  },
  component: {
    default: null
  },
  propValue: {
    default: null
  },
  style: {
    default: null
  },
  title: {
    default: null
  },
  mode: {
    default: "view"
  },
})


// const componentInstance = new props.config(uuid())
const form = reactive({
  propValue: props.propValue,
  style: props.style
})

const propValueChange = (value: any) => {
  form.propValue = value
}
const styleChange = (style: any) => {
  form.style = style
}

const Render = computed(() => {
  const componentInstance = new props.config(uuid())
  componentInstance.setPropValue({ propValue: form.propValue })
  componentInstance.setStyleValue({ style: form.style })
  return h(props.component, {
    id: componentInstance.id,
    key: componentInstance.id,
    class: 'component',
    style: getComponentStyle(componentInstance),
    component: componentInstance
  })
})
</script>
