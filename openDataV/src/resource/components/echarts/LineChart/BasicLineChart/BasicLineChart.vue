<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import { useProp, useData } from '@/resource/hooks'
import { compareResetValue } from '../../utils'
import { useEchart } from '../../hooks'

const chartEl = ref(null)
let globalOption: any
const props = defineProps<{
  component: any
}>()
let chartData:any
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
      max: propValue.data.max ? propValue.data.max : 'dataMax',
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
      type: 'line',
      symbol: 'none',
      smooth: true,
      markLine: {
        data: []
      },
      areaStyle: {
        opacity: propValue.series.lineArea ? 0.7 : 0
      },
      lineStyle: {
        width: 1,
        color: propValue.series.lineColor || '#3491FA'
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: propValue.series.lineLinearStart || '#3491FA' // 0% 处的颜色
            },
            {
              offset: 1,
              color: propValue.series.lineLinearEnd || 'transparent' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
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
