<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import { compareResetValue } from '../../utils'
import { useEchart } from '../../hooks'
import { useProp, useData } from '@/resource/hooks'

const chartEl = ref(null)
let globalOption: any
const props = defineProps<{
  component: any
}>()

let chartData:any;
const dataChange = (resp: any, _: any) => {
  if (resp.status >= 0) {
    chartData = resp.afterData
    updateData(chartData)
  }
}
useData(props.component, dataChange)

const propValueChange = () => {
  updateData(chartData)
}

const { updateEchart, resizeHandler } = useEchart(chartEl)
const { propValue } = useProp<any>(props.component, propValueChange)

onMounted(async () => {
  globalOption = getOption()
  updateEchart(globalOption)
})

const getOption = () => {
  const option: any = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: [],
      splitLine: {
        show: propValue.axis.xshow,
        lineStyle: {
          type: propValue.axis.xLineType,
          color: propValue.axis.xAxisLineColor
        }
      },
      axisLine: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisTick: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisLabel: {
        color: propValue.axis.axisLabelColor || '#fff'
      }
    },
    yAxis: {
      type: 'value',
      max: (value) => {
        if (propValue.data.max === 'dataMax' || !propValue.data.max) {
          return value.max + Number(propValue.data.maxOffset || 0)
        } else {
          return Number(propValue.data.max) + Number(propValue.data.maxOffset || 0)
        }
      },
      min: (value) => {
        if (propValue.data.min === 'dataMin') {
          return value.min - Number(propValue.data.minOffset || 0)
        } else if (['', undefined, null].includes(propValue.data.min)) {
          return 0 - Number(propValue.data.minOffset || 0)
        } else {
          return Number(propValue.data.min) - Number(propValue.data.minOffset || 0)
        }
      },
      splitLine: {
        show: propValue.axis.yshow,
        lineStyle: {
          type: propValue.axis.yLineType,
          color: propValue.axis.yAxisLineColor
        }
      },
      axisLine: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisTick: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisLabel: {
        color: propValue.axis.axisLabelColor || '#fff'
      }
    },
    series: []
  }
  let series: any[] = [
    {
      data: [],
      type: 'bar'
    }
  ]
  option.series = series
  return option as any
}

const updateData = (resp: Array<{ label: string; value: number }>) => {
  const upperLimit = propValue.data.upperLimit
  const lowerLimit = propValue.data.lowerLimit
  const data = resp.map((ele) => {
    return {
      value: compareResetValue(Number(ele.value), upperLimit, lowerLimit),
      label: ele.label
    }
  })
  globalOption = getOption()
  globalOption.series![0].data = data.map((el) => el.value)
  globalOption.xAxis = {
    ...globalOption.xAxis,
    data: data.map((el) => el.label)
  } as any
  updateEchart(globalOption)
}
</script>
