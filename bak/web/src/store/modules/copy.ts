import { copyText, uuid } from '@/utils/utils'
import { defineStore } from 'pinia'
import store from '@/store'
import { cloneDeep } from 'lodash-es'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { message } from '@/utils/message'

const useCopyStore = defineStore({
  id: 'copy',
  state: (): any => ({
    copyData: undefined,
    isCut: false
  }),
  actions: {
    copy(data: any) {
      this.copyData = cloneDeep(data)
      this.copyData.parent = undefined
      this.copyData.groupStyle = undefined
      copyText(JSON.stringify(this.copyData.toJson()))
    },

    paste(isMouse: boolean, x?: number, y?: number): void {
      if (!this.copyData) {
        message.info('请选择组件')
        return
      }

      const basicStore = useBasicStoreWithOut()

      if (isMouse) {
        this.copyData.change('top', y!)
        this.copyData.change('left', x!)
      } else {
        this.copyData.change('top', (this.copyData.style.top as number) + 10)
        this.copyData.change('left', (this.copyData.style.left as number) + 10)
      }

      const data = cloneDeep(this.copyData)
      data.id = uuid()
      basicStore.appendComponent(data)
    }
  }
})

// Need to be used outside the setup
export function useCopyStoreWithOut() {
  return useCopyStore(store)
}
