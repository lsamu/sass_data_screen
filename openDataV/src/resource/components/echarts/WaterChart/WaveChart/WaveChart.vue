<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { useEchart } from '../../hooks'
import { useProp, useData } from '@/resource/hooks'
import 'echarts-liquidfill'

const props = defineProps<{
  component: any
}>()

const chartEl = ref(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)
const chartData = ref(0)
const dataChange = (resp: any, _: any) => {
  if (resp.status >= 0) {
    chartData.value = resp.afterData
  }

  updateEchart(getOption())
}
useData(props.component, dataChange)

const { propValue } = useProp<any>(props.component, async () => {
  updateEchart(getOption())
})

const getOption = () => {
  const option = {
    series: [
      {
        type: 'liquidFill',
        amplitude: propValue.options.amplitude,
        data: [chartData.value],
        outline: {
          show: propValue.options.outlineShow,
          itemStyle: {
            borderColor: propValue.options.outlineColor
          }
        },
        shape: propValue.options.shape,
        radius: propValue.options.radius,
        direction: propValue.options.direction,
        waveAnimation: propValue.options.waveAnimation,
        label: {
          show: propValue.options.labelShow
        },
        backgroundStyle: {
          color: propValue.options.backgroundColor
        },
        color: [propValue.options.color]
      }
    ]
  }
  return option
}

onMounted(async () => {
  updateEchart(getOption())
})
</script>

<style lang="less" scoped></style>
