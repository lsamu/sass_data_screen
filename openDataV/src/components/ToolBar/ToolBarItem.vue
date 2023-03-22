<template>
  <n-tooltip>
    <template #trigger>
      <n-button quaternary size="small" :title="label" @click="action">
        <IconComponent />
      </n-button>
    </template>
    <span>{{ label }}</span>
  </n-tooltip>
  <n-divider v-if="divider" vertical />
</template>
<script lang="ts" setup>
import { XIcon } from '@/plugins/xicon'

const props = defineProps(["disable", "div", "isButton", "icon"]);

const { label, action, divider } = props as any;

const IconComponent = computed(() =>
  typeof props.icon === 'string'
    ? h(XIcon, {
      name: props.icon,
      size: 24
    })
    : (props.icon)()
)
</script>
<style lang="less" scoped></style>
