<template>
  <div>
    <n-menu
      v-if="componentData.length > 0"
      :options="menuOptions"
      :root-indent="1"
      :indent="12"
      @update:value="handleSelect"
    />
    <n-descriptions v-else class="placeholder">
      <n-descriptions-item>
        <n-empty description="画布为空" />
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { uuid } from '@/utils/utils'
import { useEventBus } from '@/bus'
import LayerItem from './LayerItem.vue'
import SimpleLayerItem from './SimpleLayerItem.vue'
import { ComponentGroup, ComponentGroupList } from '@/enum'
import { cloneDeep } from 'lodash-es'

const basicStore = useBasicStoreWithOut()
const copyStore = useCopyStoreWithOut()

const iconMap: any = {}
ComponentGroupList.map((ele) => {
  iconMap[ele.key] = ele.icon
})

const componentData = computed(() => basicStore.componentData)

const menu = ref(null)
const activeKey = ref('')
const open = (event: any) => {
  const index = event as string
  activeKey.value = index
  if (menu.value && menu.value.open) {
    menu.value.open(index)
  }
}
useEventBus('ActiveMenu', open)

const handleSelect = (key) => {
  activeKey.value = key
  const indexes: number[] = key.split('-').map((i) => Number(i))
  const activedComponent: any = basicStore.getComponentByIndex(indexes)
  if (activedComponent) {
    basicStore.setCurComponent(activedComponent, key)
  }
}

const menuOptions = ref([])

const getMenuOptions = (
  fatherIndex: string,
  components: any[],
  options: any[]
): any[] => {
  for (let i = 0; i < components.length; i++) {
    const item = components[i]
    const currentIndex = calcIndex(i, fatherIndex)
    if (item.group === ComponentGroup.CONTAINER) {
      const childrenOptions: any[] = []
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex),
            onclick: () => handleSelect(currentIndex)
          }),
        key: currentIndex,
        icon: () =>
          h(SimpleLayerItem, {
            name: 'container',
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex),
            onclick: () => handleSelect(currentIndex)
          }),
        children: getMenuOptions(currentIndex, item.subComponents || [], childrenOptions)
      })
    } else {
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex)
          }),
        key: currentIndex,
        icon: () =>
          h(SimpleLayerItem, {
            name: `${iconMap[item.group!]}`,
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex),
            onclick: () => handleSelect(currentIndex)
          })
      })
    }
  }
  return options
}
const calcIndex = (index: number, fatherIndex) => {
  if (fatherIndex) {
    return `${fatherIndex}-${index}`
  } else {
    return index.toString()
  }
}

const copy = (index) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const component:any = cloneDeep(basicStore.getComponentByIndex(indexes))
  if (component) {
    copyStore.copy(component)
  }
}

const remove = async (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  basicStore.removeComponent(indexes[indexes.length - 1], basicStore.curComponent?.parent)
}

const up = async (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  basicStore.upComponent(indexes[indexes.length - 1], basicStore.curComponent?.parent)
}

const down = async (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  basicStore.downComponent(indexes[indexes.length - 1], basicStore.curComponent?.parent)
}

const top = async (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  basicStore.topComponent(indexes[indexes.length - 1], basicStore.curComponent?.parent)
}

const bottom = async (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  basicStore.bottomComponent(indexes[indexes.length - 1], basicStore.curComponent?.parent)
}

const hidden = (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const component = basicStore.getComponentByIndex(indexes)
  if (component) component.hiddenComponent()
}

const display = (index) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const component = basicStore.getComponentByIndex(indexes)
  if (component) component.showComponent()
}
const cut = (index) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const cutComponent: any = basicStore.getComponentByIndex(indexes)
  const component: any = basicStore.cutComponent(
    indexes[indexes.length - 1],
    cutComponent?.parent
  )
  if (component) {
    copyStore.copy(component)
  }
}

const paste = (index) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const insertComponent: any = basicStore.getComponentByIndex(indexes)
  if (copyStore.copyData) {
    const data = cloneDeep(copyStore.copyData) as any
    data.id = uuid()
    basicStore.insertComponent(indexes[indexes.length - 1], data, insertComponent?.parent)
  }
}

const contextmenus = (index): any[] => {
  const indexes = index.split('-').map((el) => parseInt(el))
  return [
    {
      text: '复制',
      subText: 'Ctrl + C',
      handler: () => copy(index)
    },
    {
      text: '粘贴',
      subText: 'Ctrl + V',
      handler: () => paste(index)
    },
    {
      text: '剪切',
      subText: 'Ctrl + X',
      handler: () => cut(index)
    },
    {
      text: '拆分',
      subText: '',
      disable:
        basicStore.getComponentByIndex(index.split('-').map((i) => Number(i)))?.component !==
        'Group',
      handler: () => basicStore.decompose()
    },
    {
      text: '删除',
      subText: '',
      handler: () => remove(index)
    },
    { divider: true },
    {
      text: '置于顶层',
      handler: () => top(index),
      children: [
        { text: '置于顶层', handler: () => top(index) },
        { text: '上移一层', handler: () => up(index) }
      ]
    },
    {
      text: '置于底层',
      handler: () => bottom(index),
      children: [
        { text: '置于底层', handler: () => bottom(index) },
        { text: '下移一层', handler: () => down(index) }
      ]
    },
    { divider: true },
    {
      text: '显示',
      disable: basicStore.getComponentByIndex(indexes)?.display,
      subText: '',
      handler: () => display(index)
    },
    {
      text: '隐藏',
      disable: !basicStore.getComponentByIndex(indexes)?.display,
      subText: '',
      handler: () => hidden(index)
    }
  ]
}

watch(
  () => basicStore.componentData,
  () => {
    const components = basicStore.componentData
    menuOptions.value = []
    // @ts-ignore
    menuOptions.value = getMenuOptions('', components, [])
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="less" scoped></style>
