<template>
  <x-icon :name="themeIcon" :size="24" />
</template>
<script lang="ts" setup>
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
const projectStore = useProjectSettingStoreWithOut()
const themeIcon = computed(() => (projectStore.darkTheme ? 'sun' : 'moon'))
</script>
