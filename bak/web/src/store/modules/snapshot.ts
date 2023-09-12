import { defineStore } from 'pinia'
import store from '@/store'
import { cloneDeep } from 'lodash-es'
import { snapshotDb } from '@/utils/db'

const useSnapShotStore = defineStore({
  id: 'snapshot',
  state: (): any => ({
    latestSnapshot: undefined,
    snapshotMax: 10,
    timeHandler: undefined,
    cursor: 0
  }),
  actions: {
    async latestRecord() {
      return snapshotDb.snapshot.orderBy('id').last()
    },
    /**
     * 上一次记录
     * @returns 快照
     */
    async lastRecord() {
      let snapshot: any | undefined
      if (this.cursor) {
        snapshot = await snapshotDb.snapshot.get(this.cursor - 1)
      } else {
        snapshot = await snapshotDb.snapshot.orderBy('id').last()
      }
      if (snapshot) {
        this.cursor = snapshot.id!
        this.latestSnapshot = cloneDeep(snapshot)
        return snapshot
      }
    },
    /**
     * 下一次快照
     * @returns 快照
     */
    async nextRecord() {
      let snapshot: any | undefined
      if (this.cursor) {
        snapshot = await snapshotDb.snapshot.get(this.cursor + 1)
      } else {
        snapshot = await snapshotDb.snapshot.orderBy('id').last()
      }
      if (snapshot) {
        this.cursor = snapshot.id!
        this.latestSnapshot = cloneDeep(snapshot)
        return snapshot
      }
    },
    /**
     * 记录快照
     * @param canvasData 组件数据
     * @param canvasStyle 画布样式
     */
    recordSnapshot(canvasData: Array<any>, canvasStyle: any) {
      // 改变值
      this.latestSnapshot = {
        canvasData: cloneDeep(canvasData),
        canvasStyle: cloneDeep(canvasStyle)
      }
      snapshotDb.snapshot.add(cloneDeep(this.latestSnapshot)).then(async (_) => {
        const count: number = await snapshotDb.snapshot.count()
        if (count > this.snapshotMax) {
          const snapshot: any = (await snapshotDb.snapshot
            .orderBy('id')
            .first()) as any
          await snapshotDb.snapshot.delete(snapshot!.id!)
        }
        const snapshot = await snapshotDb.snapshot.orderBy('id').last()
        if (snapshot) {
          this.cursor = snapshot.id!
        }
        this.timeHandler = undefined
      })
    },
    /**
     * 清空快照
     */
    async clearSnapshot() {
      await snapshotDb.snapshot.clear()
      this.latestSnapshot = undefined
    },
    /**
     * 保存记录
     * @param canvasData 组件数据
     * @param canvasStyle 组件样式
     */
    saveSnapshot(canvasData: any[], canvasStyle: any) {
      if (this.timeHandler) {
        clearTimeout(this.timeHandler)
      }
      this.timeHandler = setTimeout(this.recordSnapshot, 300, canvasData, canvasStyle)
    }
  }
})

// Need to be used outside the setup
export function useSnapShotStoreWithOut() {
  return useSnapShotStore(store)
}
