import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, lightTheme, darkTheme } from 'naive-ui'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

// const themeRef = ref<'light' | 'dark'>('dark')
const projectStore = useProjectSettingStoreWithOut()
const configProviderPropsRef = computed(() => ({
  theme: !projectStore.darkTheme ? lightTheme : darkTheme
}))

const { message, dialog, notification, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)
export { message, dialog, notification, loadingBar }
