<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-collapse accordion>
      <n-collapse-item
        v-for="{ label, prop, children } in attrKeys"
        :key="`${curComponent.id}${prop}`"
        :title="label"
        :name="prop"
      >
        <FormAttr
          :children="children"
          :data="formData[prop]"
          :name="label"
          :uid="prop"
          :ukey="curComponent.id"
          @change="(key, value) => changed(prop, key, value)"
        />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import FormAttr from '@/designer/modules/form/FormAttr'

const props = defineProps<{
  curComponent: any
}>()
const basicStore = useBasicStoreWithOut()

const formData = ref({
  common: {
    name: props.curComponent.name,
    component: props.curComponent.component,
    id: props.curComponent.id
  }
})

const attrKeys = computed(() => {
  if (props.curComponent) {
    return props.curComponent.propFromValue
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.propValue
const changed = (form: string, key: string, val: any) => {
  basicStore.setCurComponentPropValue(form, key, val)
}

const resetFormData = () => {
  const data: any = {
    common: {
      name: props.curComponent.name,
      component: props.curComponent.component,
      id: props.curComponent.id
    }
  }

  if (props.curComponent && props.curComponent.propValue) {
    Object.assign(data, props.curComponent.propValue)
  }
  formData.value = data
}

watch(
  () => props.curComponent.id,
  () => {
    resetFormData()
  },
  { immediate: true }
)
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
