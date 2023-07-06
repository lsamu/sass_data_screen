<template>
  <div class="components">
    <n-menu :options="menuOptions" :accordion="false" />
  </div>
</template>

<script setup lang="ts">
import { ComponentGroupList } from '@/enum'
import { componentList } from '@/designer/load'
import ComponentItem from './ComponentItem.vue'
import { XIcon } from '@/plugins/xicon'

const menuOptions = computed(() => {
  const groups: { group: string; component: any[] } | {} = {}
  Object.keys(componentList).forEach((key) => {
    const component: any = new componentList[key]()
    const group = component.group
    if (!group || !component.show) {
      return
    }

    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(component)
  })
  const menus: any[] = []
  ComponentGroupList.forEach((item: any) => {
    menus.push({
      label: () => item.name,
      key: item.key,
      // icon: () =>
      //   h(XIcon, {
      //     name: `${item.icon}`
      //   }),
      children: groups[item.key]?.map((el) => {
        return {
          label: () =>
            h(ComponentItem, {
              component: el.component,
              name: el.name,
              ondragstart: handleDragStart
            }),
          key: el.component
        }
      })
    })
  })
  return menus
})

const handleDragStart = (e) => {
  e.dataTransfer.setData('componentName', e.target.dataset.component)
}
</script>

<style scoped>
.components {
  user-select: none;
}
</style>
