<template>
  <n-space vertical>
    <n-space v-for="(_, index) in arrayValue" :key="index" :wrap="false">
      <n-input v-model:value="arrayValue[index]" type="text" placeholder="请输入数据" @change="handleChange(index)" />
      <XIcon v-if="type === 'dynamic'" :size="18" name="delete" color="#F76560" @click="handleDelete(index)" />
    </n-space>
    <n-space v-if="type === 'dynamic'" :wrap="false">
      <n-input ref="addInputEl" v-model:value="newValue" type="text" placeholder="请输入数据" @keypress.enter="handleAdd" />
      <XIcon name="add" color="#4CD263" :size="18" @click="handleAdd" />
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import { message } from '@/utils/message'

const props = defineProps({
  value:{
    default:null,
  },
  count:{
    default:1,
  },
  type:{
    default:"static",
  },
  maxItem:{
    default:null,
  },
  minItem:{
    default:0,
  },
})

const emits = defineEmits(["updateValue"])

const addInputEl = ref()
const newValue = ref('')
const arrayValue = reactive(
  props.type === 'static' ? new Array(props.count).fill('') : []
)
arrayValue.splice(0, props.value.length, ...props.value)

const handleAdd = () => {
  if (!newValue.value.trim()) {
    message.warning('请输入数据')
    return
  }

  const { maxItem } = props
  if (typeof maxItem === 'number' && arrayValue.length >= maxItem) {
    message.warning(`最多 ${maxItem} 个输入框，添加失败`)
    return
  }

  arrayValue.push(newValue.value)
  emits('updateValue', arrayValue)
  newValue.value = ''
  nextTick(() => {
    addInputEl.value?.focus()
  })
}

const handleDelete = (index: number) => {
  // minItem 有默认值，默认值为数值，不用再判断
  if (arrayValue.length <= props.minItem) {
    message.warning(`最少 ${props.minItem} 个输入框，删除失败`)
    return
  }
  arrayValue.splice(index, 1)
  emits('updateValue', arrayValue)
}

const handleChange = (index: number) => {
  if (arrayValue[index] === props.value[index]) {
    return
  }

  emits('updateValue', arrayValue)
}
</script>

<style lang="less" scoped></style>
