<template>
  <n-select
    v-model:value="weight"
    clearable
    placeholder="请选择字重"
    :options="weights"
    @update:value="change"
  />
</template>

<script setup lang="ts">
import { SYS_FONT_WEIGHT } from '@/enum/font'
import { NSelect } from 'naive-ui'

const props = withDefaults(
  defineProps(["value"]),
  {
    value: 400
  }
)

const weight = ref(props.value)
const weights = reactive(SYS_FONT_WEIGHT)

const emits = defineEmits(["update:value","change"])

const change = (val: number) => {
  weight.value = val
  emits('update:value', weight.value)
  emits('change', weight.value)
}
</script>
