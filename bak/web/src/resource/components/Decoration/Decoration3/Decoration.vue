<template>
  <div v-resize="resizeHandler" class="dv-decoration-6">
    <svg :width="width" :height="height">
      <template v-for="(point, i) in points" :key="i">
        <rect
          :fill="mergedColor[Math.random() > 0.5 ? 0 : 1]"
          :x="(rectWidth + rectSpace) * i"
          :y="point[1] - heights[i] / 2"
          :width="rectWidth"
          :height="heights[i]"
          :index="i"
        >
          <animate
            attributeName="y"
            :values="`${point[1] - minHeights[i] / 2};${point[1] - heights[i] / 2};${
              point[1] - minHeights[i] / 2
            }`"
            :dur="`${randoms[i]}s`"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            :values="`${minHeights[i]};${heights[i]};${minHeights[i]}`"
            :dur="`${randoms[i]}s`"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </template>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { randomExtend } from './utils'

const props = defineProps<{
  component: any
}>()
const propChange = (prop: string, key: string, value: any) => {
  if (prop === 'base' && key === 'rectWidth') rectWidth.value = value
  if (prop === 'base' && key === 'space') rectSpace.value = value
  if (prop === 'base' && key === 'color1') mergedColor.value[0] = value
  if (prop === 'base' && key === 'color2') mergedColor.value[1] = value
  calcPointsPosition()
}

const { propValue } = useProp<any>(props.component, propChange)

const width = ref(300)
const height = ref(35)

const resizeHandler = (entry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
  calcPointsPosition()
}

const rowNum = ref(1)
const rectWidth = ref(propValue.base.rectWidth || 7)
const rectSpace = ref(propValue.base.space || 0)
const points = ref([])
const heights = ref([])
const minHeights = ref([])
const randoms = ref([])
const mergedColor = ref([propValue.base.color1, propValue.base.color2])

const calcPointsPosition = () => {
  const rowPoints = Math.round(width.value / (rectWidth.value + rectSpace.value))
  const horizontalGap = width.value / (rowPoints + 1)
  const verticalGap = height.value / (rowNum.value + 1)

  const result = new Array(rowNum.value)
    .fill(0)
    .map((_, i: number) =>
      new Array(rowPoints).fill(0).map((_, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)])
    )
  points.value = result.reduce((all, item) => [...all, ...item], [])
  heights.value = heights.value = new Array(rowNum.value * rowPoints)
    .fill(0)
    .map(() =>
      Math.random() > 0.8
        ? randomExtend(0.7 * height.value, height.value)
        : randomExtend(0.2 * height.value, 0.5 * height.value)
    )
  minHeights.value = new Array(rowNum.value * rowPoints)
    .fill(0)
    .map((_, i) => heights.value[i] * Math.random())
  randoms.value = new Array(rowNum.value * rowPoints).fill(0).map(() => Math.random() + 1.5)
}

onMounted(() => {
  calcPointsPosition()
})
</script>

<style lang="less" scoped>
.dv-decoration-6 {
  width: 100%;
  height: 100%;
  svg {
    transform-origin: left top;
  }
}
</style>
