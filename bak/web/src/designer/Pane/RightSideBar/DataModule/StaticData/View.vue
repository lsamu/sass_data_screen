<template>
  <n-form>
    <n-form-item key="title" label="静态数据">
      <n-input-group>
        <n-input
          v-model:value="formData.title"
          :readonly="true"
          placeholder="编辑请点击"
          @click="isShow = true"
        />
        <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
      </n-input-group>
    </n-form-item>
  </n-form>
  <n-modal v-model:show="isShow" display-directive="show">
    <n-card
      style="width: 600px"
      title="静态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <Static
        v-model:options="formData"
        @data-change="dataChangeHandler"
        @script-change="scriptChangeHandler"
      />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>

import { DataType } from '@/resource/models'
import { ScriptType } from '@/enum'
import Static from '@/apiView/RequestContent/static'
import { message } from '@/utils/message'
const props = defineProps<{
  curComponent: any
}>()
const isShow = ref(false)

const formData = reactive({
  dataId: '',
  title: '',
  script: {
    code: '',
    type: ScriptType.Javascript
  }
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig && dataConfig.type === DataType.STATIC) {
    const staticRequest = props.curComponent.dataConfig?.requestConfig as any
    const result = staticRequest.toJSON()
    formData.dataId = result.dataId
    formData.script = result.script!
    formData.title = result.title!
  } else {
    message.info('请配置静态数据')
    await props.curComponent.changeRequestDataConfig(DataType.STATIC, {
      id: formData.dataId,
      script: {
        code: formData.script.code,
        type: ScriptType.Javascript
      }
    })
  }
}
const changeHandler = () => {
  props.curComponent.changeRequestDataConfig(DataType.STATIC, {
    id: formData.dataId,
    script: formData.script
  })
}

const dataChangeHandler = (id: string, title) => {
  formData.title = title
  formData.dataId = id
  changeHandler()
}

const scriptChangeHandler = (script: any) => {
  formData.script = script
  changeHandler()
}

watch(
  () => props.curComponent,
  async () => {
    if (props.curComponent) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
