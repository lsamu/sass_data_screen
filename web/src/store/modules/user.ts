import { defineStore } from 'pinia'
import store from '@/store'
import { setStorageItem, getStorageItem, removeStorageItem } from '@/utils/storage'

const useUserStore = defineStore({
  id: 'user',
  state: (): any => ({
    username: '',
    token: undefined
  }),
  getters: {
    userToken(): string | undefined {
      if (!this.token) {
        this.token = getStorageItem('token') || ''
      }
      return this.token
    },
    userName(): string {
      return this.username
    }
  },
  actions: {
    async setToken(token) {
      this.token = token
      setStorageItem('token', token)
    },
    async logout(): Promise<string> {
      this.username = ''
      this.token = undefined
      removeStorageItem('userInfo')
      removeStorageItem('token')
      return Promise.resolve('')
    },
    async setUserInfo(userInfo: any) {
      setStorageItem('userInfo', JSON.stringify(userInfo))
      return userInfo
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
