<template>
  <Icon class="icon" v-bind="$attrs" tag="span" :size="size" :color="iconColor">
    <!-- <IconComponet /> -->xxx
  </Icon>
</template>

<script lang="ts" setup>

import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()

const props = defineProps({
  name:{
    default:null
  },
  size:{
    default:25
  },
  color:{
    default:""
  }
})

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
