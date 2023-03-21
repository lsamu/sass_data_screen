<template>
  <span v-resize="resizeHandler">{{ customText }}</span>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useProp } from '@/resource/hooks'

const props = defineProps<{
  component: any
}>()
const { propValue } = useProp<any>(props.component)
const lineHeight = ref('20px')
const resizeHandler = (entry) => {
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}
let intervalId: IntervalHandle
const customText = ref(dayjs().format(propValue.base.format || 'YYYY-MM-DD HH:mm:ss'))

const updateData = () => {
  const newFormat: string = propValue.base.format
  customText.value = dayjs().format(newFormat || 'YYYY-MM-DD HH:mm:ss')
}
onMounted(() => {
  intervalId = setInterval(updateData, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
  line-height: v-bind(lineHeight);
}
</style>
