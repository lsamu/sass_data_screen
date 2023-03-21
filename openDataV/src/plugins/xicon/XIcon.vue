<template>
  <Icon class="icon" v-bind="$attrs" tag="span" :size="size" :color="iconColor">
    <!-- <IconComponet /> -->xxx
  </Icon>
</template>

<script lang="ts" setup>

import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    color?: string
  }>(),
  {
    size: 25,
    color: ''
  }
)

const iconColor = computed(() => (props.color ? props.color : projectStore.iconColor))
const IconComponet = computed(() => {
  return null;//icons[props.name] ? icons[props.name] : Help
})
</script>

<style lang="less" scoped>
.icon {
  @apply h-full inline-flex justify-center items-center;
}
</style>
