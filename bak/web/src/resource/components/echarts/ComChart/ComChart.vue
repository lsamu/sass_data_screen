<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { useEchart } from '../hooks'
import { useData } from '@/resource/hooks'

const props = defineProps<{
  component: any
}>()

const chartEl = ref(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)

const dataChange = (resp: any, _: any) => {
  if (!resp || !resp.afterData) {
    return
  }

  updateEchart(resp.afterData)
}

useData(props.component, dataChange)
</script>
