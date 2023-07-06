<template>
  <div class="bg" :style="bgStyle">
    <div ref="screen" :style="screenStyle" class="screen">
      <ComponentWrapper v-for="item in componentData" :key="item.id" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { getPageApi } from '@/api/pages'
import { backgroundToCss, filterStyle, pageScale } from '@/utils/utils'
import { createComponent } from '@/resource/models'

const componentData = ref([])
const canvasStyle = ref({
  width: 0,
  height: 0,
  background: { backgroundColor: '#272e3b' }
})
const bgStyle = computed(() => {
  return backgroundToCss(canvasStyle.value.background)
})

const screenStyle = computed(() => {
  const style = {
    ...canvasStyle.value
  }
  return filterStyle(style, ['width', 'height'])
})
const route = useRoute()
const router = useRouter()

const initComponents = async (index) => {
  console.log('加载通用组件')
  try {
    const resp = await getPageApi(index)
    if (resp.data) {
      setPageData(resp.data)
    }
  } catch (e: any) {
    await router.push({
      name: 'Error'
    })
  }
}

const setPageData = (data) => {
  if (data.canvasStyle) {
    canvasStyle.value = data.canvasStyle
  }
  if (data.canvasData) {
    componentData.value = data.canvasData.map((ele) => {
      return createComponent(ele)
    })
  }
  setScale()
}

onMounted(async () => {
  // 如果是首页
  await initComponents(route.params.index as string)

  window.addEventListener('resize', setScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScale)
})

const setScale = () => {
  const screenEl: HTMLDivElement | null = document.querySelector('.screen')
  if (screenEl) {
    const designWidth = canvasStyle.value.width
    const designHeight = canvasStyle.value.height
    pageScale(screenEl, designWidth, designHeight)
  }
}
</script>

<style scoped lang="less">
.bg {
  @apply w-screen h-screen;

  .screen {
    position: relative;
    left: 50%;
    transform-origin: 0 0;
    transform: translateX(-50%);
  }
}
</style>
