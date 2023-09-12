<template>
  <div class="main">
    <n-menu
      v-model:value="activeItem"
      :options="menuOptions"
      class="sider-bar-item"
      :collapsed="false"
      :icon-size="30"
      @update:value="menuChange"
    />
  </div>
</template>

<script setup lang="ts">
import TypeItem from './modules/TypeItem.vue'
const apiTypes = [
  {
    label: 'STATIC',
    icon: 'data',
    key: 'STATIC'
  },
  {
    label: 'REST',
    icon: 'http',
    key: 'REST'
  },
  {
    label: 'GraphQL',
    icon: 'earth',
    key: 'GRAPHQL'
  },
  {
    label: '实时',
    icon: 'transform',
    key: 'REALTIME'
  }
]

const activeItem = ref('REST')
const emits = defineEmits(["change"])
const menuChange = (value) => {
  activeItem.value = value
  emits('change', value)
}

const menuOptions = computed(() => {
  const menus:any[] = []
  apiTypes.forEach((item) => {
    menus.push({
      key: item.key,
      icon: () =>
        h(TypeItem, {
          icon: item.icon,
          label: item.label
        })
    })
  })
  return menus
})
</script>

<style scoped lang="less">
.main {
  border-right: 1px var(--n-text-color) dashed;
  width: min-content;
}
</style>
