import { defineStore } from 'pinia'
import store from '@/store'

const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): any => ({
    appTheme: '#2d8cf0',
    navTheme: 'dark',
    darkTheme: true,
    headerSetting: {
      //固定顶部
      fixed: true,
      //显示重载按钮
      isReload: true
    },
    showFooter: true,
    menuSetting: {
      //最小宽度
      minMenuWidth: 64,
      //菜单宽度
      menuWidth: 200,
      //固定菜单
      fixed: true,
      // 折叠菜单
      collapsed: false
    },
    crumbsSetting: {
      //是否显示
      show: true
    },
    isPageAnimate: true,
    pageAnimateType: 'zoom-fade',
    // 是否启用离开编辑界面提醒功能
    enableCloseAlert: true
  }),
  getters: {
    iconColor(): string {
      return this.darkTheme ? '#eee' : '#333'
    }
  },
  actions: {
    setNavTheme(value): void {
      this.navTheme = value
    },
    setAppTheme(value): void {
      this.appTheme = value
    },
    setDarkTheme(isDark: boolean): void {
      this.darkTheme = isDark
    }
  }
})

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
