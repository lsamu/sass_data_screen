<template>
  <div v-resize="resizeHandler" class="border-image"></div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
const props = defineProps<{
  component: any
}>()

const { propValue } = useProp<any>(props.component)

const width = ref(150)
const height = ref(150)
const borderImageUrl = computed(
  () => `url(${propValue.base.borderSource || '/images/border-image.png'})`
)
const borderImageSlice = computed(() => propValue.base.borderImageSlice.join(' '))
const borderWidth = computed(() => propValue.base.borderWidth.join(' '))
const backgroundColor = computed(() => propValue.base.backgroundColor || 'transparent')

// 监听窗口大小变化

const resizeHandler = (entry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.border-image {
  background-color: v-bind(backgroundColor);
  border-width: v-bind(borderWidth);
  border-image-source: v-bind(borderImageUrl);
  border-image-slice: v-bind(borderImageSlice);
}
</style>
