<template>
  <x-icon :name="themeIcon" />
</template>
<script lang="ts" setup>
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
const projectStore = useProjectSettingStoreWithOut()
const themeIcon = computed(() => (projectStore.darkTheme ? 'sun' : 'moon'))
</script>
