<template>
  <n-select
    v-model:value="font"
    clearable
    placeholder="请选择字体"
    :options="fonts"
    @update:value="change"
  />
</template>

<script setup lang="ts">
import { SYS_FONTS } from '@/enum/font'

const props = defineProps({
  value:{
    default:""
  }
})

const font = ref(props.value)
const fonts = reactive(SYS_FONTS)

const emits = defineEmits(["update:value","change"])

const change = (val) => {
  font.value = val
  emits('update:value', font.value)
  emits('change', font.value)
}
</script>
