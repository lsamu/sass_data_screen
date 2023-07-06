import Dexie from 'dexie'

export class SnapShotDexie extends Dexie {
  snapshot!: any

  constructor() {
    super('snapshot')
    this.version(1).stores({
      snapshot: '++id, canvasData, canvasStyle' // Primary key and indexed props
    })
  }
}

export const snapshotDb = new SnapShotDexie()
