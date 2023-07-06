<template>
  <div class="data-list" style="height: calc(100vh - 120px)">
    <n-form
      v-if="curComponent.dataIntegrationMode === DataIntegrationMode.UNIVERSAL"
      @submit.prevent
    >
      <n-form-item key="dataType" label="数据类型">
        <n-select
          v-model:value="dataType"
          placeholder="请选择数据类型"
          :options="dataTypeOptions"
          @update:value="typeChanged"
        />
      </n-form-item>
      <StaticData v-if="dataType === DataType.STATIC" :curComponent="curComponent" />
      <!-- <RealTimeData v-else-if="dataType === 'RealTime'" /> -->
      <DynamicData v-else-if="dataType === DataType.REST" :curComponent="curComponent" />
      <DemoData v-else-if="dataType === DataType.DEMO" :curComponent="curComponent" />
    </n-form>
    <n-descriptions v-else class="placeholder">
      <n-descriptions-item>
        <n-empty description="未发现数据配置项" />
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>
<script lang="ts" setup>
import { DataType } from '@/resource/models'
import StaticData from './StaticData'
import DynamicData from './DynamicData'
import DemoData from './DemoData'
import { DataIntegrationMode } from '@/resource/models/data'

const props = defineProps<{
  curComponent: any
}>()

const dataType = ref(DataType.DEMO)
const dataTypeOptions = reactive([
  {
    label: '示例数据',
    value: DataType.DEMO
  },
  {
    label: '静态数据',
    value: DataType.STATIC
  },
  {
    label: '动态数据',
    value: DataType.REST
  },
  {
    label: '实时数据',
    value: DataType.REALTIME
  }
])

const typeChanged = (type) => {
  dataType.value = type
}

onMounted(() => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig) {
    dataType.value = dataConfig.type
  }
})

watch(
  () => props.curComponent,
  async (value: any) => {
    if (value) {
      const dataConfig = props.curComponent.dataConfig
      if (dataConfig) {
        dataType.value = dataConfig.type
      }
    }
  },
  { deep: true }
)
</script>
<style lang="less">
.data-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
